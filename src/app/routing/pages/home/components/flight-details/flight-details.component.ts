import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Flight } from '../../../../../models/flight';
import { AircraftDetails } from '../../../../../models/aircraft-details';
import { GeoApiService } from '../../../../../modules/common/geo-api.service';
import { UtilService } from '../../../../../modules/common/util.service';
import { BehaviorSubject } from 'rxjs';

enum NavigationStates {
  Aircraft,
  Airline,
  Arr
}

@Component({
  selector: 'flight-details',
  templateUrl: 'flight-details.html',
  styleUrls: ['./flight-details.scss']
})
export class FlightDetailsComponent implements OnInit {

  flight: Flight;
  activeNavigation: string = 'aircraft';
  geoApiService: GeoApiService;
  details: AircraftDetails;
  utilService: UtilService;

  constructor(geoApi: GeoApiService, utilService: UtilService) {
    this.geoApiService = geoApi;
    this.utilService = utilService;
  }

  ngOnInit() {

  }

  setup(flight: Flight) {
    this.flight = flight;
    let dets = new AircraftDetails(this.flight);
    this.geoApiService.getLatLong(dets.departure).then((response) => {
      dets.departurePosition = [response[0].geometry.location.lat(), response[0].geometry.location.lng()];

      this.geoApiService.getLatLong(dets.destination).then(response => {
        dets.destinationPosition = [response[0].geometry.location.lat(), response[0].geometry.location.lng()];


        const tripDestination = this.geoApiService.distance(dets.departurePosition[0], dets.departurePosition[1], dets.destinationPosition[0], dets.destinationPosition[1]);
        const actualDistance = this.geoApiService.distance(this.flight.geography.latitude, this.flight.geography.longitude, dets.destinationPosition[0], dets.destinationPosition[1]);

        dets.tripPercentage = this.utilService.calculatePercentage(actualDistance, tripDestination);

        this.details = dets;
      })
    });
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