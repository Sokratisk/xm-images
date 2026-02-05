import { inject, Injectable } from '@angular/core';
import { Image } from '../store/images.store';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class ImagesService {
  private http = inject(HttpClient);
  private readonly API = 'https://picsum.photos';
  private fetchedPages = new Set<number>();
  private width = 200;
  private height = 300;

  loadImages(): Observable<Image[]> {
    const randomDelay = 2000 + Math.random() * 1000;

    return this.http
      .get<Image[]>(`${this.API}/v2/list?page=${this.getRandomPage()}`)
      .pipe(
        map((images) =>
          images.map((img) => ({
            ...img,
            width: this.width,
            height: this.height,
            download_url: `${this.API}/id/${img.id}/${this.width}/${this.height}`,
          })),
        ),
        delay(randomDelay),
      );
  }

  fetchImageById(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.API}/id/${id}/info`).pipe(
      map((img) => ({
        ...img,
        width: this.width,
        height: this.height,
        download_url: `${this.API}/id/${img.id}/${this.width}/${this.height}`,
      })),
    );
  }

  private getRandomPage(): number {
    let randomPage: number;

    do {
      randomPage = Math.floor(Math.random() * 33) + 1;
    } while (this.fetchedPages.has(randomPage));

    this.fetchedPages.add(randomPage);
    return randomPage;
  }
}
