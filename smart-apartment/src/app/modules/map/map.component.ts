import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RootStoreState } from '@app/root-store';
import * as selectors from '@app/root-store/apartment-store/apartment.selector';
import { ApartmentStoreEffects } from '@app/root-store/apartment-store/effects';
import { MapService } from '@app/shared/services';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapPins: any = [];
  map!: mapboxgl.Map;
  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';
  zoom = 12.7;
  lat = 45.899977;
  lng = 6.172652;
  source: any;
  markerElements: any = [];
  mapLoaded: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    private mapService: MapService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private apartmentService: ApartmentStoreEffects
  ) {
    this.subscription.add(
      this.apartmentService.apartmentObject.subscribe((data: any) => {
        if (
          data &&
          data.apartment &&
          data.apartment?.records &&
          this.mapLoaded &&
          data.productId == -1
        ) {
          this.mapPins = [...data.apartment.records];
          this.loadMapWithMarkers();
          this.cd.markForCheck();
        } else if (data.productId && data.apartmentItem && this.mapLoaded) {
          this.mapPins = [];

          this.mapPins.push(data?.apartmentItem);
          this.zoomToMarker();
          this.cd.detectChanges();
        }

        if (data.productId && data.apartmentItem) {
          this.mapPins = [];

          this.mapPins.push(data?.apartmentItem);
          this.zoomToMarker();
        }
      })
    );
  }

  ngOnInit() {
    this.store$
      .pipe(select(selectors.getApartmentsData()))
      .subscribe((response) => {
        if (response?.length > 1) {
          this.mapPins = [...response];
          this.buildMap();
          this.cd.detectChanges();
        }
      });
  }

  /**
   * CREATE MAP ( MAP CONFIGURATION )
   */
  buildMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: this.getMapCenterCoordinates(),
      scrollZoom: true,
    });

    // 1) DATA TO BE ADDED WHEN MAP GETS LOADED FIRST
    this.map.on('load', (event) => {
      const markersPins: any = this.convertMapPinsToMarkers(this.mapPins);

      // 2) ADD SOURCE
      this.map?.addSource('smartApartments', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markersPins,
        },
      });

      // 3) GET SOURCE
      this.source = this.map?.getSource('smartApartments');

      // 4) CREATE MAP LAYER
      this.map?.addLayer({
        id: 'smartApartments',
        source: 'smartApartments',
        type: 'symbol',
        layout: {
          'text-size': 24,
          'text-transform': 'uppercase',
          'text-offset': [0, 1.5],
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2,
        },
      });

      this.mapLoaded = true;
      this.loadMapWithMarkers();
    });
  }

  /**
   * GEO-JSON format - CONVERT MAP PINS TO MARKER
   * @param mapPins
   * @returns
   */
  convertMapPinsToMarkers(mapPins: any[]) {
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
   * LOAD MAP WITH ALL THE MARKERS & MARKER CONFIGURATION
   */
  loadMapWithMarkers() {
    // DELETE ALL MARKERS
    this.markerElements.forEach((markerToRemove: any) => {
      let markerPinLayer: any = document.getElementById(
        markerToRemove.propertyid
      );
      try {
        markerPinLayer.remove();
      } catch (e) {}
    });

    this.markerElements = [];

    // 1) ADD MARKER TO MAP

    const bounds = [];
    this.mapPins.forEach((marker: any) => {
      bounds.push(
        new mapboxgl.LngLat(marker.geocode.Longitude, marker.geocode.Latitude)
      );

      // 2) CREATE MARKER LAYER
      let makerElt: any = document.createElement('div');

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

      // 3) CREATE CUSTOM MARKER HTML & POPUP
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
        .addTo(this.map);
      this.markerElements.push({
        ...markerElement,
        propertyid: marker?.propertyID,
      });

      const markerDiv = markerElement.getElement();

      markerDiv.addEventListener('mouseenter', () =>
        markerElement.togglePopup()
      );

      markerDiv.addEventListener('mouseleave', () =>
        markerElement.togglePopup()
      );

      // 4) EVENT WHEN MARKER IS CLICKED
      markerElement.getElement().addEventListener('click', (event: any) => {
        const propertyCoordinates = JSON.parse(
          event?.srcElement['data-coordinates'] || ''
        );
        this.map.flyTo({
          center: propertyCoordinates,
          essential: true,
          zoom: 16,
        });

        // TOGGLE POPUP
        markerElement.togglePopup();
        const propertyId = event?.srcElement['id'] || '';

        // ROUTE TO PROPERTY ID
        this.router.navigate(['/smart-apartment'], {
          queryParams: { item: 'apartmentItem', propertyId: propertyId },
        });
      });
    });

    this.map.flyTo({
      center: this.getMapCenterCoordinates(),
      essential: true,
      zoom: 12.7,
    });
  }

  /**
   * GET CENTER COORDINATES OF MAP
   * @returns
   */
  getMapCenterCoordinates() {
    const bounds: any = [];
    this.mapPins.forEach(function (marker: any) {
      bounds.push(
        new mapboxgl.LngLat(marker.geocode.Longitude, marker.geocode.Latitude)
      );
    });
    let llb = new mapboxgl.LngLatBounds(...bounds);
    const centerCoordinates = llb.getCenter();
    return centerCoordinates;
  }

  /**
   * ZOOM TO THE SELECTED MARKER BASED UPON PROPERTYID
   */
  zoomToMarker() {
    const focusedMarker = this.mapPins[0];
    try {
      const toRemoveMarkers = this.markerElements.filter(
        (markerElement: any) =>
          markerElement.propertyid !== focusedMarker.propertyID
      );
      toRemoveMarkers.forEach((markerToRemove: any) => {
        let markerPinLayer: any = document.getElementById(
          markerToRemove.propertyid
        );
        markerPinLayer.remove();
      });

      // FLY ( NAVIGATE ) TO THE MARKER
      this.map.flyTo({
        center: [
          focusedMarker.geocode.Longitude,
          focusedMarker.geocode.Latitude,
        ],
        essential: true,
        zoom: 16,
      });
    } catch (e) {}
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
