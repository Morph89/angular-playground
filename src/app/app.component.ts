
import { Component } from '@angular/core';
import { DataRequestService } from './modules/common/data-request.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  dataRequestService:DataRequestService;

  constructor(dataRequestService: DataRequestService) {
    this.dataRequestService = dataRequestService;
    this.init();
  }

  init() {
    this.dataRequestService.request('GET', 'https://jsonplaceholder.typicode.com/photos')
    .then(response => {
      console.log(response);
    })
  }
}
