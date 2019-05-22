import {Injectable} from '@angular/core';
import { DataRequestService } from '../common/data-request.service';
@Injectable({
  providedIn: 'root'
})
export class PhotoApiService {
  dataRequestService: DataRequestService;

  constructor(dataRequestService: DataRequestService) {
    this.dataRequestService = dataRequestService;
  }
  public getPhotos(limit: number) {
    this.dataRequestService.request('GET', 'https://jsonplaceholder.typicode.com/photos')
    .then(response => {
      
    })
  }
}