import {
  Component,
  effect,
  HostListener,
  inject,
  OnDestroy,
  Signal,
} from '@angular/core';
import { Image, ImagesStore } from '../../store/images.store';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-photos',
  imports: [LoaderComponent],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnDestroy {
  private store = inject(ImagesStore);

  public images: Signal<Image[]> = this.store.images;
  public favoriteImages: Signal<Image[]> = this.store.favoriteImages;

  private initImagesEffect = effect(() => {
    const img = this.images();

    const bodyHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;

    if (bodyHeight < windowHeight) {
      setTimeout(() => {
        this.store.loadImages();
      }, 100);
    }
  });

  isImageFavorited(image: any): boolean {
    return this.favoriteImages().some((fav) => fav.id === image.id);
  }

  onImageClick(image: any): void {
    this.store.saveFavoriteImage(image);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (this.store.loading()) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold) {
      this.store.loadImages();
    }
  }

  ngOnDestroy(): void {
    this.store.clearImages();
  }
}
