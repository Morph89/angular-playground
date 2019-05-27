import {Component, OnInit} from '@angular/core';
import {Input, Output } from '@angular/core';
import { Flight } from '../../../../../models/flight';
import { AircraftDetails } from '../../../../../models/aircraft-details';

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

  constructor() {
  }

  ngOnInit() {
    console.log(this.flight);
  }

  getAircraftDetails(): AircraftDetails {
    return new AircraftDetails( this.flight);
  }
}