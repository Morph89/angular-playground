export class Flight {
  aircraft: any;
  airline: any;
  arrival: any;
  departure: any;
  flight: any;
  geography: any;
  speed: any;
  status: any;
  system: any;

  constructor(data:any) {
    this.aircraft = data.aircraft;
    this.airline = data.airline;
    this.arrival = data.arrival;
    this.departure = data.departure;
    this.flight = data.flight;
    this.geography = data.geography;
    this.speed = data.speed;
    this.status = data.status;
  }

  getIcaoCode():string {
    return this.aircraft.iataCode || 'NOICAO';
  }
}