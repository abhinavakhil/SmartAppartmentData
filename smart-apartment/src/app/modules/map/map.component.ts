import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RootStoreState } from '@app/root-store';
import { MapService } from '@app/shared/services';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import * as selectors from '@app/root-store/apartment-store/apartment.selector';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApartmentStoreEffects } from '@app/root-store/apartment-store/effects';

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
    private store: Store,
    private apartmentService: ApartmentStoreEffects
  ) {
    // this.store.select(getMapPins).subscribe((mapPins) => {
    //   this.mapPins = mapPins;
    //   if (mapPins.length > 1 && this.mapLoaded) {
    //     this.loadMapWithPins();
    //   } else if (mapPins.length == 1 && this.mapLoaded) {
    //     this.zoomToMarker();
    //   }
    // });

    this.subscription.add(
      this.apartmentService.apartmentObject.subscribe((data: any) => {
        console.log(data);
        if (
          data &&
          data.apartment &&
          data.apartment?.records &&
          this.mapLoaded &&
          !data.productId
        ) {
          this.mapPins = [...data.apartment.records];
          this.loadMapWithPins();
          this.cd.markForCheck();
        } else if (data.productId && data.apartmentItem && this.mapLoaded) {
          this.mapPins = [];

          this.mapPins.push(data?.apartmentItem);
          this.zoomToMarker();
          this.cd.detectChanges();
        }
      })
    );
  }

  ngOnInit() {
    this.store$
      .pipe(select(selectors.getApartmentsData()))
      .subscribe((response) => {
        console.log(response);

        if (response?.length > 1) {
          this.mapPins = [...response];
          this.buildInitMap();
          this.cd.detectChanges();
        }
      });
  }

  /**
   * create map/map configuration
   */
  buildInitMap() {
    try {
      this.map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: this.getCenterCoordinates(),
        scrollZoom: true,
      });

      /// Add data on map load
      this.map.on('load', (event) => {
        /// register source
        const markersPins: any = this.convertMapPinsToMarkers(this.mapPins);
        this.map?.addSource('smartApartments', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: markersPins,
          },
        });
        /// get source
        this.source = this.map?.getSource('smartApartments');
        /// create map layers
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
        this.loadMapWithPins();
      });
    } catch (e) {}
  }

  /**
   * geoSon format
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
   * Load Map with all the markers
   */
  loadMapWithPins() {
    // delete all maerkers
    this.markerElements.forEach((markerToRemove: any) => {
      let markerPinLayer: any = document.getElementById(
        markerToRemove.propertyid
      );
      try {
        markerPinLayer.remove();
      } catch (e) {}
    });

    this.markerElements = [];
    // add markers to map
    const bounds = [];
    console.log(this.mapPins);
    this.mapPins.forEach((marker: any) => {
      // make a marker for each feature and add it to the map as a layer
      bounds.push(
        new mapboxgl.LngLat(marker.geocode.Longitude, marker.geocode.Latitude)
      );

      // create custom marker html
      let el: any = document.createElement('div');
      el.className = 'marker';
      el.id = marker?.propertyID;
      el['data-coordinates'] = JSON.stringify([
        marker.geocode.Longitude,
        marker.geocode.Latitude,
      ]);
      // el.style.backgroundImage = marker?.favorite
      //   ? 'url(https://my.smartapartmentdata.com/assets/images/map-circle-red.svg)'
      //   : 'url(https://my.smartapartmentdata.com/assets/images/map-circle-red.svg)';

      el.style.backgroundImage = marker?.favorite
        ? 'url(/assets/svg/pin-red-heart.svg)'
        : 'url(/assets/svg/pin-red.svg)';

      el.style.width = marker?.favorite ? '52px' : '40px';
      el.style.height = marker?.favorite ? '52px' : '40px';
      el.style.backgroundSize = '100%';
      // create custom marker html
      const markerElement = new mapboxgl.Marker(el)
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

      markerElement.getElement().addEventListener('click', (event: any) => {
        const propertyCoordinates = JSON.parse(
          event?.srcElement['data-coordinates'] || ''
        );
        this.map.flyTo({
          center: propertyCoordinates,
          essential: true,
          zoom: 16,
        });

        // remove detail pop-up
        markerElement.togglePopup();
        const propertyId = event?.srcElement['id'] || '';
        this.router.navigate(['/smart-apartment'], {
          queryParams: { item: 'apartmentItem', propertyId: propertyId },
        });
      });
    });

    this.map.flyTo({
      center: this.getCenterCoordinates(),
      // center: [this.lng, this.lat],
      essential: true,
      zoom: 12.7,
    });
  }

  /**
   * get the center coordinates
   * @returns
   */
  getCenterCoordinates() {
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
   * zoom to the selected marker
   */
  zoomToMarker() {
    const focusedMarker = this.mapPins[0];
    console.log(focusedMarker, this.markerElements);
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
      // fly to marker
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

  ngOnDestroy(): void {}
}
