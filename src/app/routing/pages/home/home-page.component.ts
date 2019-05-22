import { Component, OnInit} from '@angular/core';
import { FlightsApiService } from '../../../modules/api/flights/flights-api.service';
import { Observable } from 'rxjs';
import { Flight } from '../../../models/flight';
@Component(
  {
    selector: 'home-page',
    templateUrl: 'home-page.html'
  }
)
export class HomePage implements OnInit {
  flightsAPI: FlightsApiService;

  flights$: Observable<Flight[]>;

  constructor(flightsApiService: FlightsApiService) {
    this.flightsAPI = flightsApiService;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.flights$ = this.flightsAPI.getFlights(10);
  }
}