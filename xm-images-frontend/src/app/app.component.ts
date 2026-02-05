import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'xm-images-frontend';
}
