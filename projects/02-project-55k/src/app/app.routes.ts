import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('~/pages/test-home/test-home.component'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
