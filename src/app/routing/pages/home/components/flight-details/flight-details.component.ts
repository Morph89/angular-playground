import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Flight } from '../../../../../models/flight';
import { AircraftDetails } from '../../../../../models/aircraft-details';
import { GeoApiService } from '../../../../../modules/common/geo-api.service';

enum NavigationStates {
  Aircraft,
  Airline,
  Arr
}

@Component({
  selector: 'flight-details',
  templateUrl: 'flight-details.html'
})
export class FlightDetailsComponent implements OnInit {
  @Input() flight: Flight;
  activeNavigation: string;
  geoApiService: GeoApiService;
  details: AircraftDetails;

  constructor(geoApi: GeoApiService) {
    this.geoApiService = geoApi;
  }

  ngOnInit() {
    console.log(this.flight);
    let dets = new AircraftDetails(this.flight);
    this.geoApiService.getLatLong(dets.destination).then((response) => {
      console.log(response);
    })
  }

  canShowDetails(): boolean {
    if (this.activeNavigation === 'aircraft') {
      return this.details != undefined;
    }

    return false;
  }

  onNavigationClick(navName: string) {
    this.activeNavigation = 'aircraft';
  }
}