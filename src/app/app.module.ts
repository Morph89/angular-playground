import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CommonModules } from './modules/common/common-module';
import { FlightsApiModule } from './modules/api/flights/flights-api.module';
import { AppRoutes } from './routing/routing.consts';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports:      [ BrowserModule, FormsModule, CommonModule, FlightsApiModule,
  RouterModule.forRoot(
      AppRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
