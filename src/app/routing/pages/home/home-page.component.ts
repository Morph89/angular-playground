import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FlightsApiService } from '../../../modules/api/flights/flights-api.service';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil, expand, first } from 'rxjs/operators';
import { Flight } from '../../../models/flight';
import { } from 'googlemaps';

import { FlightDetailsComponent } from './components/flight-details/flight-details.component';

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

  @ViewChild('details') detailsPanel: FlightDetailsComponent;
  @ViewChild('map') mapElement: ElementRef<any>;
  map: google.maps.Map;

  constructor(flightsApiService: FlightsApiService) {
    this.flightsAPI = flightsApiService;
  }

  ngOnInit() {
    this.init();
  }


  doStuff() {
    const flightRequest = this.flightsAPI.getFlights(500)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        first()
      )
      .subscribe(x => {
        this.flights$ = x;
        this.setupMarkers();
        flightRequest.unsubscribe();
        // this.doStuff();
      });
  }

  setupMarkers() {

    let existingMarkers = this.markers.filter(m => {
      return this.flights$.find(f => f.flight.icaoNumber === m.uuid || f.flight.iataNumber === m.uuid) != null;
    });

    let removableMarkers = this.markers.filter(m => {
      return this.flights$.find(f => f.flight.icaoNumber == m.uuid || f.flight.iataNumber == m.uuid) == null;
    });

    let newFlights = this.flights$.filter(f => {
      return this.markers.filter(m => m.uuid === f.flight.icaoNumber || m.uuid === f.flight.iataNumber).length === 0;
    });

    if (removableMarkers.length > 0) {
      this.clearMarkers(removableMarkers);
    }

    if (newFlights.length > 0) {
      this.addMarkers(newFlights);
    }

    if (existingMarkers.length > 0) {
      this.updateMarkers(existingMarkers);
    }
  }

  onFlightSelected(flight: Flight) {
    timer(1)
      .pipe(first())
      .subscribe((x) => {
        this.selectedFlight = flight;
        this.map.setCenter(new google.maps.LatLng(flight.geography.latitude, flight.geography.longitude));
        this.map.setZoom(6);
        this.detailsPanel.setup(this.selectedFlight);
      })

  }

  updateMarkers(existingMarkers: any[]) {
    for (let marker of existingMarkers) {
      const flight: Flight = this.flights$.find(f => f.flight.icaoNumber === marker.uuid || f.flight.iataNumber === marker.uuid);

      for (let mk of this.markers) {
        if (mk.uuid === marker.uuid) {
          mk.marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3,
            strokeColor: 'black'
          });
          mk.marker.setPosition({ lat: flight.geography.latitude, lng: flight.geography.longitude });

        }
      }

    }
  }

  addMarkers(newFlights: Flight[]) {
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
      marker.setDraggable(false);
      marker.addListener('click',  () => {
        this.onFlightSelected(flight);
      })
      this.markers.push({
        uuid: flight.flight.iataNumber || flight.flight.icaoNumber,
        marker: marker
      });
    }
  }

  clearMarkers(removableMarkers: any[]) {
    for (let i = 0; i < removableMarkers.length; i++) {
      removableMarkers[i].marker.setMap(null);
      this.markers.splice(this.markers.indexOf(removableMarkers[i]), 1);
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
}