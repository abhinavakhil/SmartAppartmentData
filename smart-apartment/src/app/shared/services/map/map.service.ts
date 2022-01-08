import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: mapboxgl.Map | undefined;
  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';
  lat = 45.899977;
  lng = 6.172652;
  zoom = 12;

  constructor() {
    // this.map = new mapboxgl.Map({
    //   accessToken: environment.mapbox.accessToken,
    //   container: 'map',
    //   style: this.style,
    //   zoom: this.zoom,
    //   center: [this.lng, this.lat],
    // });
    // mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
      scrollZoom: true,
    });
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
