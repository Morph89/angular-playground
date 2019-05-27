import {NgModule} from '@angular/core';
import { FlightsApiService } from './flights-api.service';

@NgModule({
  providers: [FlightsApiService]
})
export class FlightsApiModule { }