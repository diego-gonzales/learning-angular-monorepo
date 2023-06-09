import { Routes } from '@angular/router';

export default [
  {
    path: 'products',
    loadComponent: () =>
      import('~/pages/products/products-home/products-home.component'),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('~/pages/products/product-detail/product-detail.component'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
] as Routes;

// Another option
/*
export default [
  {
    path: '',
    loadComponent: () =>
      import('~/pages/products/products-home/products-home.component'),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('~/pages/products/product-detail/product-detail.component'),
  },
] as Routes;
*/
