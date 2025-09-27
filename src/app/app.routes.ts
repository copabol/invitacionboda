import { Routes } from '@angular/router';
import {  HomeComponent } from './home/home';
import {  GaleriaComponent } from './galeria/galeria';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'galeria', component: GaleriaComponent }
];
