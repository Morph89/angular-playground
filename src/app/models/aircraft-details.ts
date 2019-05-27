import { Flight } from './flight';

export class AircraftDetails {
  departure: string;
  destination: string;
  departurePosition: number[];
  destinationPosition: number[];
  altitude: number;
  tripPercentage: number;
  
  constructor(flight: Flight, dP: number[], dsP: number[]) {
    this.departure = flight.departure.icaoCode;
    this.destination = flight.arrival.icaoCode;
    this.altitude = flight.geography.altitude;
    this.departurePosition = dP;
    this.destinationPosition = dsP;
  }
}