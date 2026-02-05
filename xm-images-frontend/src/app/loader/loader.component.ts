import { Component, inject } from '@angular/core';
import { ImagesStore } from '../../store/images.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  private store = inject(ImagesStore);

  loading = this.store.loading;
}
