import { Routes } from '@angular/router';
import { HomeComponent } from './features/dashboard/pages/home/home.component';

export const routes: Routes = [
  { path: 'songs', component: HomeComponent },
  { path: '', redirectTo: '/songs', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/songs' } // Ruta para cualquier otra URL (página no encontrada)
];
