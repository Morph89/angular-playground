
import { Component } from '@angular/core';
import { DataRequestService } from './modules/common/data-request.service';
import { FlightsApiService } from './modules/api/flights/flights-api.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  flightsAPI: FlightsApiService;

  constructor(flightsApiService: FlightsApiService) {
    this.flightsAPI = flightsApiService;
    this.init();
  }

  init() {
    this.flightsAPI.getFlights(10)
    .then(response => {
      console.log(response);
    }, error => {
    })
  }
}
