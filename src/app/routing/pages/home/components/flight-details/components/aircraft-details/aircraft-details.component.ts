import { Component, Input, OnInit} from '@angular/core';
import { AircraftDetails } from '../../../../../../../models/aircraft-details';

@Component({
  selector: 'aircraft-details',
  templateUrl: 'aircraft-details.html'
})
export class AircraftDetailsComponent implements OnInit{
  @Input() aircraftDetail: AircraftDetails;

  ngOnInit() {

  }
}