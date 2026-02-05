import { Routes } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  { path: '**', redirectTo: 'photos' },
];
