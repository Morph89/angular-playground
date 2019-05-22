
import { Injectable } from '@angular/core';
import { DataRequestService } from '../../common/data-request.service';
import { from} from 'rxjs';
import { bufferCount, toArray, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PhotoApiService {
  dataRequestService: DataRequestService;

  constructor(dataRequestService: DataRequestService) {
    this.dataRequestService = dataRequestService;
  }
  public getPhotos(limit: number) {
    return new Promise((resolve, reject) => {
      this.dataRequestService.request('GET', 'https://jsonplaceholder.typicode.com/photos')
        .then((response: any) => {
          from(response)
          .pipe(
            take(limit),
            toArray()
          )
          .subscribe(data => {
            resolve(data);})
        })
    })
  }
}