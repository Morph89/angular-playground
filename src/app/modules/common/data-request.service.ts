import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataRequestService {
  request(method, url, payload?) {
    return new Promise((resolve, reject) => {
      if (method === 'GET') {
        const request = ajax.getJSON(url).subscribe(result => {
          request.unsubscribe();
          resolve(result);
          }, error => {
            request.unsubscribe();
            reject(error);
          });
      } else {
        ajax({
          url: url,
          method: method,
          body: payload
        })
        .pipe(first())
        .subscribe(result => resolve(result), error => reject(error));
      }
    });
  }
}