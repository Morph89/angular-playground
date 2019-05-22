import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: 'home', loadChildren: './pages/home/home-page.module#HomePageModule' },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
