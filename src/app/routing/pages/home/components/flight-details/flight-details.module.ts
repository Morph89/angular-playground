import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FlightDetailsComponent } from './flight-details.component';
import { AircraftDetailsComponent } from './components/aircraft-details/aircraft-details.component';

@NgModule({
  declarations: [FlightDetailsComponent, AircraftDetailsComponent],
  exports: [FlightDetailsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FlightDetailsModule {

}