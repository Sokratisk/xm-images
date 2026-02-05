import { Component, inject, OnDestroy } from '@angular/core';
import { ImagesStore } from '../../store/images.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnDestroy {
  private store = inject(ImagesStore);
  private router = inject(Router);
  public favoriteImages = this.store.favoriteImages;

  onImageClick(image: any): void {
    this.router.navigate(['/favorites', image.id]);
  }

  ngOnDestroy(): void {
    this.store.clearImages();
  }
}
