
import { Injectable } from '@angular/core';
import { DataRequestService } from '../../common/data-request.service';
import { from} from 'rxjs';
import { bufferCount, toArray, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FlightsApiService {
  dataRequestService: DataRequestService;

  constructor(dataRequestService: DataRequestService) {
    this.dataRequestService = dataRequestService;
  }
  public getFlights(limit: number) {
    const key = 'b6b1ca-256761';
    return new Promise((resolve, reject) => {
      this.dataRequestService.request('GET', `http://aviation-edge.com/v2/public/flights?key=${key}&limit=${limit}`)
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