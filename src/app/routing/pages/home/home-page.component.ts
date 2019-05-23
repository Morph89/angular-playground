import { Component, OnInit, OnDestroy,  ViewChild, ElementRef } from '@angular/core';
import { FlightsApiService } from '../../../modules/api/flights/flights-api.service';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil, expand, first } from 'rxjs/operators';
import { Flight } from '../../../models/flight';
import {} from 'googlemaps';

@Component(
  {
    selector: 'home-page',
    templateUrl: 'home-page.html'
  }
)
export class HomePage implements OnInit, OnDestroy {
  flightsAPI: FlightsApiService;

  flights$: Flight[];
  selectedFlight: Flight = null;
  ngUnsubscribe = new Subject<void>();

  @ViewChild('map') mapElement: ElementRef<any>;
  map: google.maps.Map;

  constructor(flightsApiService: FlightsApiService) {
    this.flightsAPI = flightsApiService;
  }

  ngOnInit() {
    this.init();
  }


  doStuff() {
    const flightRequest = this.flightsAPI.getFlights(100)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        first()
      )
      .subscribe(x => {
        this.flights$ = x;
        this.updateMarkers();
        flightRequest.unsubscribe();
        // this.doStuff();
      });
  }

  updateMarkers() {}

  ngOnDestroy() {
    this.unsubscribeSubscriptions();
  }

  unsubscribeSubscriptions() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init() {
    this.initMap();
    this.doStuff();
  }

  initMap() {
    const mapProperties = {
        center: new google.maps.LatLng(35.2271, -80.8431),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   console.log(this.mapElement)
   this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }

  onFlightClick(flight: Flight) {
    this.selectedFlight = flight;
  }
}