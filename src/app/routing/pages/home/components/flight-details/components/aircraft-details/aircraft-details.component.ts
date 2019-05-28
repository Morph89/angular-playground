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

  getPlaneStyle() {
    return {
      top: - (this.aircraftDetail.altitude / 1000) + 'px',
      left: this.aircraftDetail.tripPercentage + '%'
    }
  }
}