import { Injectable, inject, signal, Signal } from '@angular/core';
import { ImagesService } from '../services/images.service';
import localStorageService from '../services/localStorage.service';

export interface Image {
  id: string;
  download_url: string;
  width: number;
  height: number;
}

@Injectable({ providedIn: 'root' })
export class ImagesStore {
  private imagesService = inject(ImagesService);

  public images = signal<Image[]>([]);
  public loading = signal(false);
  public favoriteImages = signal<Image[]>(localStorageService.loadImages());
  public singleImage = signal<Image | null>(null);

  loadImages(): void {
    if (this.loading()) return;
    this.loading.set(true);

    this.imagesService.loadImages().subscribe({
      next: (data) => {
        this.images.update((imgs) => [...imgs, ...data]);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  loadFavoriteImages(): void {
    this.favoriteImages.set(localStorageService.loadImages());
  }

  loadImageById(id: string): void {
    const cached =
      this.singleImage() && this.singleImage()!.id === id
        ? this.singleImage()!
        : this.images().find((i) => i.id === id) ||
          this.favoriteImages().find((i) => i.id === id);

    if (cached) {
      this.singleImage.set(cached);
      return;
    }

    this.imagesService.fetchImageById(id).subscribe({
      next: (data) => {
        this.singleImage.set(data);
      },
      error: () => {
        this.singleImage.set(null);
      },
    });
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

  setLoading(isLoading: boolean): void {
    this.loading.set(isLoading);
  }
}
