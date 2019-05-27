import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoApiService {

  private geocoder: any;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  getLatLong(address): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
          resolve(results[0].geometry.location);
        } else {
          reject();
        }
      });
    });
  }
}

