import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CommonModules } from './modules/common/common-module';
import { PhotoApiModule } from './modules/api/photos/photos-api.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, CommonModule],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
