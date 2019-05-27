import { NgModule } from '@angular/core';
import { DataRequestService } from './data-request.service';
import { GeoApiService } from './geo-api.service';
import { UtilService } from './util.service';
@NgModule({
  providers: [ GeoApiService, UtilService ]
})
export class CommonModules {

}
