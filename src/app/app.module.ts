import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CommonModules } from './modules/common/common-module';
import { PhotoApiModule } from './modules/api/photos/photos-api.module';
import { AppRoutes } from './routing/routing.consts';

@NgModule({
  imports:      [ BrowserModule, FormsModule, CommonModule, PhotoApiModule,
  RouterModule.forRoot(
      AppRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
