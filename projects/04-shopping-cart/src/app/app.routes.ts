import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/shop/shop.component'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
