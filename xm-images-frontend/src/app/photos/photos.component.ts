import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
  HostListener,
} from '@angular/core';
import { ImagesStore } from '../../store/images.store';

@Component({
  selector: 'app-photos',
  imports: [],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sentinel', { static: false }) sentinel?: ElementRef<HTMLElement>;
  private store = inject(ImagesStore);
  public images = this.store.images;
  public favoriteImages = this.store.favoriteImages;

  ngAfterViewInit() {
    this.loadUntilScrollable();
  }

  isImageFavorited(image: any): boolean {
    return this.favoriteImages().some((fav) => fav.id === image.id);
  }

  private loadUntilScrollable() {
    setTimeout(() => {
      const bodyHeight = document.body.offsetHeight;
      const windowHeight = window.innerHeight;

      if (bodyHeight < windowHeight) {
        this.store.loadImages();
        this.loadUntilScrollable();
      }
    }, 100);
  }

  onImageClick(image: any): void {
    this.store.saveFavoriteImage(image);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold) {
      this.store.loadImages();
    }
  }

  ngOnDestroy(): void {
    this.store.clearImages();
  }
}
