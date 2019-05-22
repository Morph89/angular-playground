import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class DataRequestService {
  request(method, url, payload?) {
    return new Promise((resolve, reject) => {
      if (method === 'GET') {
        ajax.getJSON(url).subscribe(result => resolve(result), error => reject(error));
      } else {
        ajax({
          url: url,
          method: method,
          body: payload
        })
        .subscribe(result => resolve(result), error => reject(error));
      }
    });
  }
}