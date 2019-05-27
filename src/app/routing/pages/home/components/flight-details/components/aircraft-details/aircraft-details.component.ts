import { Component, Input, OnInit} from '@angular/core';
import { AircraftDetails } from '../../../../../../../models/aircraft-details';

@Component({
  selector: 'aircraft-details',
  templateUrl: 'aircraft-details.html',
  styleUrls: [ 'aircraft-details.scss' ]
})
export class AircraftDetailsComponent implements OnInit{
  @Input() aircraftDetail: AircraftDetails;

  ngOnInit() {

  }
}