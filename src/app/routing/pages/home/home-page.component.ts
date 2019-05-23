import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsApiService } from '../../../modules/api/flights/flights-api.service';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil, expand, first } from 'rxjs/operators';
import { Flight } from '../../../models/flight';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature.js';
import Polygon from 'ol/geom/Polygon.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj';
import Draw, { createRegularPolygon, createBox } from 'ol/interaction/Draw.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector } from 'ol/source.js';
import { Fill, RegularShape, Stroke, Style } from 'ol/style.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

@Component(
  {
    selector: 'home-page',
    templateUrl: 'home-page.html'
  }
)
export class HomePage implements OnInit, OnDestroy {
  flightsAPI: FlightsApiService;

  flights$: Flight[];
  selectedFlight: Flight = null;
  subscriptions: any[] = [];
  map: any;
  activeLayer: VectorLayer;
  stroke = new Stroke({ color: 'black', width: 2 });
  fill = new Fill({ color: 'red' });
  styles = {
    'square': new Style({
      image: new RegularShape({
        fill: this.fill,
        stroke: this.stroke,
        points: 4,
        radius: 10,
        angle: Math.PI / 4
      })
    })
  };

  ngUnsubscribe = new Subject<void>();

  constructor(flightsApiService: FlightsApiService) {
    this.flightsAPI = flightsApiService;
  }

  ngOnInit() {
    this.init();


  }

  doStuff() {
    const flightRequest = this.flightsAPI.getFlights(100)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        first()
      )
      .subscribe(x => {
        this.flights$ = x;
        this.updateMarkers();
        flightRequest.unsubscribe();
        this.doStuff();
      });
  }

  updateMarkers() {
    if(this.activeLayer !== undefined) {
      this.map.removeLayer(this.activeLayer);
    }
    let features = [];
    for(let item of this.flights$) {
      const coordinates = fromLonLat([item.geography.longitude, item.geography.latitude]);
      let feature = new Feature(new Point(coordinates));
      feature.setStyle(this.styles.square);
      features.push(feature);
    }
     

    var source = new VectorSource({
      features: features
    });

    var vectorLayer = new VectorLayer({
      source: source
    });
    this.activeLayer = vectorLayer;

    this.map.addLayer(vectorLayer);
  }

  ngOnDestroy() {
    this.unsubscribeSubscriptions();
  }

  unsubscribeSubscriptions() {
    console.log('Unsubscribe called');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init() {
    this.doStuff();

    const washingtonLonLat = [-77.036667, 38.895];
    const washingtonWebMercator = fromLonLat(washingtonLonLat);

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        center: washingtonWebMercator,
        zoom: 8
      })
    });
  }

  onFlightClick(flight: Flight) {
    this.selectedFlight = flight;
  }
}