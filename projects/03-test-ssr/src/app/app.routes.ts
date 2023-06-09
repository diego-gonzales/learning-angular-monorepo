import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('~/pages/products/products.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

// Another option
/*
export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('~/pages/products/products.routes'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
];
*/
