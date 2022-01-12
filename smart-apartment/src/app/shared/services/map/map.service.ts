import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  /**
   * CONVERT PINS TO MARKER
   * @param mapPins LIST CONTAINING COORDINATES
   * @returns GEJSON MAP
   */
  convertPinsToMarker(mapPins: any[]) {
    return mapPins.map((mapPin) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [mapPin.geocode.Longitude, mapPin.geocode.Latitude],
      },
      properties: {},
    }));
  }

  /**
   * GET MAP CENTER COORDINATES
   * @param mapPins LIST CONTAINING COORDINATES
   * @returns CENTER COORDINATES
   */
  getMapCenter(mapPins: any) {
    const bounds: any = [];
    mapPins.forEach(function (marker: any) {
      bounds.push(
        new mapboxgl.LngLat(marker.geocode.Longitude, marker.geocode.Latitude)
      );
    });
    let llb = new mapboxgl.LngLatBounds(...bounds);
    const centerCoordinates = llb.getCenter();
    return centerCoordinates;
  }

  /**
   * FLY TO MARKER
   * @param focusedMarker
   */
  flyToMarker(focusedMarker: any, map: any) {
    map.flyTo({
      center: [focusedMarker.geocode.Longitude, focusedMarker.geocode.Latitude],
      essential: true,
      zoom: 16,
    });
  }

  /**
   * ZOOM TO THE SELECTED MARKER
   * @param mapPins LIST CONTAINING COORDINATES
   * @param markerElements MARKER ELEMENT
   * @param map MAP
   */
  zoomIntoSelectedMarker(mapPins: any, markerElements: any, map: any) {
    const focusedMarker = mapPins[0];
    try {
      const toRemoveMarkers = markerElements.filter(
        (markerElement: any) =>
          markerElement.propertyid !== focusedMarker.propertyID
      );
      toRemoveMarkers.forEach((markerToRemove: any) => {
        let markerPinLayer: any = document.getElementById(
          markerToRemove.propertyid
        );
        markerPinLayer.remove();
      });

      // CHANGE REPLACE MARKER ON MAP ON USER SELECTION
      const selectedMarker = Array.from(
        document.getElementsByClassName(
          'mapboxgl-marker'
        ) as HTMLCollectionOf<HTMLElement>
      );

      selectedMarker.forEach((element) => {
        element.style.backgroundImage =
          'url(https://my.smartapartmentdata.com/assets/images/map-circle-blue.svg)';
      });

      // FLY ( NAVIGATE ) TO THE MARKER
      this.flyToMarker(focusedMarker, map);
    } catch (e) {}
  }

  /**
   * CREATE MARKER LAYER ON MAP
   * @param marker MARKER
   */
  createMapLayerOnMap(marker: any, makerElt: any) {
    makerElt.className = 'marker';

    makerElt.id = marker?.propertyID;

    makerElt['data-coordinates'] = JSON.stringify([
      marker.geocode.Longitude,
      marker.geocode.Latitude,
    ]);

    makerElt.style.backgroundImage = marker?.favorite
      ? 'url(https://my.smartapartmentdata.com/assets/images/map-circle-red.svg)'
      : 'url(https://my.smartapartmentdata.com/assets/images/map-circle-red.svg)';

    makerElt.style.width = marker?.favorite ? '102px' : '80px';
    makerElt.style.height = marker?.favorite ? '102px' : '80px';
    makerElt.style.backgroundSize = '100%';
    return makerElt;
  }

  /**
   * CREATE CUSTOM MARKER HTML & POPUP
   * @param makerElt MARKER ELT
   * @param marker MARKER ITEM
   * @param map MAP
   * @param markerElements MARKER ELEMENT
   * @returns MARKER ELEMENT
   */
  createCustomMarkerAndPopup(
    makerElt: any,
    marker: any,
    map: any,
    markerElements: any
  ) {
    const markerElement = new mapboxgl.Marker(makerElt)
      .setLngLat([marker.geocode.Longitude, marker.geocode.Latitude])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<h4>${marker?.name}</h4>
      <p style="color: #6c757d">
      ${marker?.city}, ${marker?.streetAddress}
      </p>`
        )
      )
      .addTo(map);
    markerElements.push({
      ...markerElement,
      propertyid: marker?.propertyID,
    });

    const markerDiv = markerElement.getElement();

    markerDiv.addEventListener('mouseenter', () => markerElement.togglePopup());

    markerDiv.addEventListener('mouseleave', () => markerElement.togglePopup());
    return markerElement;
  }

  /**
   * WHEN MARKER IS CLICKED
   * @param event CLICK EVENT
   * @param map MAP
   * @param markerElement MARKER ELEMENT
   * @param router ROUTER
   */
  markerClicked(event: any, map: any, markerElement: any, router: any) {
    const propertyCoordinates = JSON.parse(
      event?.srcElement['data-coordinates'] || ''
    );
    map.flyTo({
      center: propertyCoordinates,
      essential: true,
      zoom: 16,
    });

    // TOGGLE POPUP
    markerElement.togglePopup();
    const propertyId = event?.srcElement['id'] || '';

    // ROUTE TO PROPERTY ID
    router.navigate(['/smart-apartment'], {
      queryParams: { item: 'apartmentItem', propertyId: propertyId },
    });
  }
}
