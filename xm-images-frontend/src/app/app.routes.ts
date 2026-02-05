import { Routes } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SinglePhotoViewComponent } from './single-photo-view/single-photo-view.component';

export const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'favorites/:id', component: SinglePhotoViewComponent },
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  { path: '**', redirectTo: 'photos' },
];
