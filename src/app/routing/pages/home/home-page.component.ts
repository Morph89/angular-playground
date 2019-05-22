import { Component, OnInit} from '@angular/core';
import { FlightsApiService } from '../../../modules/api/flights/flights-api.service';
import { Observable } from 'rxjs';

@Component(
  {
    selector: 'home-page',
    templateUrl: 'home-page.html'
  }
)
export class HomePage implements OnInit {
  flightsAPI: FlightsApiService;

  flights$: Observable<any[]>;

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