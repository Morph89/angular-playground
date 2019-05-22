import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home-page.component';
import { FlightsApiModule } from '../../../modules/api/flights/flights-api.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  providers: [],
  declarations: [HomePage],
  imports: [FlightsApiModule, RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})

export class HomePageModule {

}