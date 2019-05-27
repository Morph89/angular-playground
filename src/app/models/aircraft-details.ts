import { Flight } from './flight';

export class AircraftDetails {
  departure: string;
  destination: string;
  
  constructor(flight: Flight) {
    this.departure = flight.departure.icaoCode,
    this.destination = flight.arrival.icaoCode
  }
}