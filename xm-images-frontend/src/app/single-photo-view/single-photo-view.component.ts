import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesStore } from '../../store/images.store';

@Component({
  selector: 'app-single-photo-view',
  templateUrl: './single-photo-view.component.html',
  styleUrl: './single-photo-view.component.scss',
})
export class SinglePhotoViewComponent implements OnInit {
  private store = inject(ImagesStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public image = this.store.singleImage;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.loadImageById(id!);
  }

  onRemoveClick(): void {
    this.store.removeFavoriteImage(this.image()?.id!);
    this.router.navigate(['/favorites']);
  }
}
