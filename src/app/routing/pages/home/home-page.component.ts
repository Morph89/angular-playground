import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsApiService } from '../../../modules/api/flights/flights-api.service';
import { Observable, Subject, timer} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flight } from '../../../models/flight';

import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component(
  {
    selector: 'home-page',
    templateUrl: 'home-page.html'
  }
)
export class HomePage implements OnInit , OnDestroy {
  flightsAPI: FlightsApiService;

  flights$: Observable<Flight[]>;
  selectedFlight: Flight = null;
  subscriptions: any[] = [];

  ngUnsubscribe = new Subject<void>();

  constructor(flightsApiService: FlightsApiService) {
    this.flightsAPI = flightsApiService;
  }

  ngOnInit() {
    //this.init();
    this.doStuff();
  }

  doStuff() {
    console.log('Doing stuff');
    this.flightsAPI.getFlights(10)
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(x => {
      console.log('hi');
    })
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
    this.flightsAPI.getFlights(10);
    

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 5
      })
    });
  }

  onFlightClick(flight: Flight) {
    this.selectedFlight = flight;
  }
}