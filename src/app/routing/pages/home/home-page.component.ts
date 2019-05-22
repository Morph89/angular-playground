import { Component, OnInit } from '@angular/core';
import { FlightsApiService } from '../../../modules/api/flights/flights-api.service';
import { Observable } from 'rxjs';
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
export class HomePage implements OnInit {
  flightsAPI: FlightsApiService;

  flights$: Observable<Flight[]>;
  selectedFlight: Flight = null;

  constructor(flightsApiService: FlightsApiService) {
    this.flightsAPI = flightsApiService;
  }

  ngOnInit() {
    //this.init();
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