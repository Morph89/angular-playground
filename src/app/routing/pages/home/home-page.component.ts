import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FlightsApiService } from '../../../modules/api/flights/flights-api.service';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil, expand, first } from 'rxjs/operators';
import { Flight } from '../../../models/flight';
import { } from 'googlemaps';

@Component(
  {
    selector: 'home-page',
    templateUrl: 'home-page.html',
    styleUrls: ['home-page.css']
  }
)
export class HomePage implements OnInit, OnDestroy {
  flightsAPI: FlightsApiService;

  flights$: Flight[];
  markers: any[] = [];
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
        this.doStuff();
      });
  }

  updateMarkers() {


    let existingMarkers = this.markers.filter(m => {
      return this.flights$.find(f => f.flight.icaoNumber === m.uuid || f.flight.iataNumber === m.uuid) != null;
    });
    console.log('Existing length', existingMarkers.length);

    let removableMarkers = this.markers.filter(m => {
      return this.flights$.find(f => f.flight.icaoNumber !== m.uuid && f.flight.iataNumber !== m.uuid) != null;
    });
    console.log('Removables length', removableMarkers.length);

    let newFlights = this.flights$.filter(f => {
      return this.markers.filter(m => m.uuid === f.flight.icaoNumber || m.uuid === f.flight.iataNumber).length === 0;
    });
    console.log('New flights length', newFlights.length);

    if(removableMarkers.length > 0)  {
      this.clearMarkers(removableMarkers);
    }

    for (let flight of newFlights) {
      const marker = new google.maps.Marker({
        position: { lat: flight.geography.latitude, lng: flight.geography.longitude },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 3,
          strokeColor: 'red'
        },
        draggable: true,
        map: this.map
      });
      this.markers.push({
        uuid: flight.flight.iataNumber || flight.flight.icaoNumber,
        marker: marker});
    }
  }

  clearMarkers(removableMarkers: any) {
    for (let i = 0; i < removableMarkers.length; i++) {
      removableMarkers[i].marker.setMap(null);
      this.markers.splice(this.markers.indexOf(removableMarkers[i]))
    }

  }

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
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  onFlightClick(flight: Flight) {
    this.selectedFlight = flight;
  }
}