import { NgModule } from '@angular/core';
import { DataRequestService } from './data-request.service';
import { GeoApiService } from './geo-api.service';
@NgModule({
  providers: [ GeoApiService ]
})
export class CommonModules {

}
