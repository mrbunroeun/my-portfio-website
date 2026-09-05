import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'projects', component: Home },
  { path: 'projects/:filter', component: Home },
  { path: '**', redirectTo: '' }
];
