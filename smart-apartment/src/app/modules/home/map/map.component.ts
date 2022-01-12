import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RootStoreState } from '@app/root-store';
import * as selectors from '@app/root-store/apartment-store/apartment.selector';
import { ApartmentStoreEffects } from '@app/root-store/apartment-store/effects';
import { MapService } from '@app/shared/services';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { mapStyle } from './map-style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() sidenavState: any;
  @Output() openSidenavClick: EventEmitter<any> = new EventEmitter<any>();

  mapPins: any = [];
  map!: mapboxgl.Map;
  style = mapStyle;
  zoom = 12.2;
  source: any;
  markerElements: any = [];
  mapLoaded: boolean = false;
  subscription: Subscription = new Subscription();
  screenWidth: number = 0;
  activeQuery: any;

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  constructor(
    private mapService: MapService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    private activatedRoute: ActivatedRoute,
    private apartmentService: ApartmentStoreEffects
  ) {
    this.onResize();
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

    this.getQueryParams();
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
      this.addSource(markersPins);

      // 3) GET SOURCE
      this.source = this.map?.getSource('smartApartments');

      // 4) CREATE MAP LAYER
      this.addLayers();

      this.mapLoaded = true;
      this.loadMapWithMarkers();
    });
  }

  /**
   * ADD SOURCCE
   * @param markersPins
   */
  addSource(markersPins: any) {
    this.map?.addSource('smartApartments', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: markersPins,
      },
    });
  }

  /**
   * ADD LAYERS TO MAP
   */
  addLayers() {
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
  }

  /**
   * GEO-JSON format - CONVERT MAP PINS TO MARKER
   * @param mapPins
   * @returns
   */
  convertMapPinsToMarkers(mapPins: any[]) {
    return this.mapService.convertPinsToMarker(mapPins);
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

      let markerElt: any = document.createElement('div');

      markerElt = this.mapService.createMapLayerOnMap(marker, markerElt);

      // 3) CREATE CUSTOM MARKER HTML & POPUP

      const markerElement = this.mapService.createCustomMarkerAndPopup(
        markerElt,
        marker,
        this.map,
        this.markerElements
      );

      // 4) EVENT WHEN MARKER IS CLICKED
      markerElement.getElement().addEventListener('click', (event: any) => {
        this.mapService.markerClicked(
          event,
          this.map,
          markerElement,
          this.router
        );
      });

      // 5) CHANGE COLOR OF SELECTED MARKER ON RELOAD
      if (this.mapPins.length == 1) {
        if (this.activeQuery?.propertyId == marker.propertyID) {
          markerElt.style.backgroundImage =
            'url(https://my.smartapartmentdata.com/assets/images/map-circle-blue.svg)';
        }
      }
    });

    this.map.flyTo({
      center: this.getMapCenterCoordinates(),
      essential: true,
      zoom: 12.2,
    });
  }

  /**
   * GET CENTER COORDINATES OF MAP
   * @returns CENTER COORDINATES
   */
  getMapCenterCoordinates() {
    return this.mapService.getMapCenter(this.mapPins);
  }

  /**
   * ZOOM TO THE SELECTED MARKER BASED UPON PROPERTYID
   */
  zoomToMarker() {
    this.mapService.zoomIntoSelectedMarker(
      this.mapPins,
      this.markerElements,
      this.map
    );
  }

  /**
   * GET QUERY PARAMS
   */
  getQueryParams() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.activeQuery = { ...params };
      })
    );
  }

  /**
   * CLOSE SIDENAV
   */
  closeSidenav() {
    this.openSidenavClick.emit('close');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
