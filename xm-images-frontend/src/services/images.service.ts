import { Injectable } from '@angular/core';
import { Image } from '../store/images.store';

@Injectable({
  providedIn: 'any',
})
export class ImagesService {
  private readonly API = 'https://picsum.photos';

  private readonly limit = 20;

  loadImages(): Promise<Image[]> {
    const newImages: Image[] = Array.from({ length: this.limit }, () => ({
      id: Math.random().toString(36).substring(2),
      download_url: `${this.API}/200/300?random=${Math.floor(
        Math.random() * 100000,
      )}`,
    }));

    return new Promise((resolve) => {
      setTimeout(() => resolve(newImages), 300);
    });
  }
}
