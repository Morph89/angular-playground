import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightDetailsComponent } from './flight-details.component';
import { AircraftDetailsComponent } from './components/aircraft-details/aircraft-details.component';
import { CommonModules } from '../../../../../modules/common/common-module';

@NgModule({
  imports: [ CommonModule, CommonModules],
  declarations: [FlightDetailsComponent, AircraftDetailsComponent],
  exports: [FlightDetailsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FlightDetailsModule {

}