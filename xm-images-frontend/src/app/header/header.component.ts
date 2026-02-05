import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public router = inject(Router);

  goToPhotos(): void {
    this.router.navigate(['/photos']);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
