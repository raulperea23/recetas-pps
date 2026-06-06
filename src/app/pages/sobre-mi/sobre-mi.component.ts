import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css',
})
export class SobreMiComponent {
  constructor(private title: Title) {
    this.title.setTitle('Más sobre mí');
  }
}
