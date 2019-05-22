import { Component } from '@angular/core';

@Component(
  {
    selector: 'home-page',
    template: 'home-page.html'
  }
)
export class HomePage {
  constructor() {
    console.log('Home Page Loaded');
  }
}