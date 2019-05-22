import { Component } from '@angular/core';

@Component(
  {
    selector: 'home-page',
    templateUrl: 'home-page.html'
  }
)
export class HomePage {
  constructor() {
    console.log('Home Page Loaded');
  }
}