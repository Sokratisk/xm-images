import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePhotoViewComponent } from './single-photo-view.component';

describe('SinglePhotoViewComponent', () => {
  let component: SinglePhotoViewComponent;
  let fixture: ComponentFixture<SinglePhotoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePhotoViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
