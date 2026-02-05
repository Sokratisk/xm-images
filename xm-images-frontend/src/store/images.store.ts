import { Injectable, inject, signal, Signal } from '@angular/core';
import { ImagesService } from '../services/images.service';
import localStorageService from '../services/localStorage.service';

export interface Image {
  id: string;
  download_url: string;
}

@Injectable({ providedIn: 'root' })
export class ImagesStore {
  private imagesService = inject(ImagesService);

  public images = signal<Image[]>([]);
  public loading = signal(false);
  public favoriteImages = signal<Image[]>(localStorageService.loadImages());

  loadImages(): void {
    if (this.loading()) return;
    this.loading.set(true);

    this.imagesService
      .loadImages()
      .then((newImages) => {
        this.images.update((current) => [...current, ...newImages]);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  loadFavoriteImages(): void {
    this.favoriteImages.set(localStorageService.loadImages());
  }

  saveFavoriteImage(image: Image): void {
    const isFav = this.favoriteImages().some((f) => f.id === image.id);
    if (isFav) {
      localStorageService.removeImage(image.id);
    } else {
      localStorageService.saveImage(image);
    }
    this.loadFavoriteImages();
  }

  removeFavoriteImage(id: string): void {
    localStorageService.removeImage(id);
    this.loadFavoriteImages();
  }

  clearImages(): void {
    this.images.set([]);
  }
}
