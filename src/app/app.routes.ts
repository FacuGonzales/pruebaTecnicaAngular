import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/pages.component').then(p => p.PagesComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/pages.component').then(p => p.PagesComponent),
    pathMatch: 'full'
  }
];
