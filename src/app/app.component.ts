
import { Component } from '@angular/core';
import { DataRequestService } from './modules/common/data-request.service';
import { PhotoApiService } from './modules/api/photos/photo-api.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  photoAPI: PhotoApiService;

  constructor(photoApiService: PhotoApiService) {
    this.photoAPI = photoApiService;
    this.init();
  }

  init() {
    this.photoAPI.getPhotos(10)
    .then(response => {
      console.log(response);
    }, error => {
    })
  }
}
