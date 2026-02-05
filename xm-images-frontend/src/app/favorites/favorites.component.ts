import { Component, inject } from '@angular/core';
import { ImagesStore } from '../../store/images.store';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  private store = inject(ImagesStore);
  public favoriteImages = this.store.favoriteImages;

  onImageClick(image: any): void {
    //this.store.removeFavoriteImage(image.id);
  }

  ngOnDestroy(): void {
    this.store.clearImages();
  }
}
