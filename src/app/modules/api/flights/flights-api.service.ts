
import { Injectable } from '@angular/core';
import { DataRequestService } from '../../common/data-request.service';
import { Observable, from, of, interval, timer } from 'rxjs';
import { bufferCount, toArray, take, catchError, map, filter, first } from 'rxjs/operators';
import { Flight } from '../../../models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightsApiService {
  dataRequestService: DataRequestService;

  constructor(dataRequestService: DataRequestService) {
    this.dataRequestService = dataRequestService;
  }
  public getFlights(limit: number): Observable<Flight[]> {
    const key = 'b6b1ca-256761';

    return Observable.create((observer) => {
      timer(1000).
      pipe(first())
        .subscribe(_ => {
          console.log("hi");
          observer.next([]);
          observer.complete();
          /*
          this.dataRequestService.request('GET', `https://aviation-edge.com/v2/public/flights?key=${key}&limit=${limit}`)
            .then((response: any) => {
              from(response)
                .pipe(
                  take(limit),
                  map(x => new Flight(x)),
                  filter(x => x.aircraft.iataCode !== '' || x.aircraft.icaoCode !== ''),
                  toArray(),
                  catchError(_ => of('Hali'))
                )
                .subscribe(data => {
                  observer.next(data);
                })
            }, error => {
              observer.complete([]);
            });
            */
        });
    })
  }
}