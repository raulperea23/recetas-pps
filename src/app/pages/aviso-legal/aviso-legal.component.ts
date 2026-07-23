import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, MatButtonModule],
  templateUrl: './aviso-legal.component.html',
  styleUrl: './aviso-legal.component.css',
})
export class AvisoLegalComponent {
  fechaActualizacion = '23 de julio de 2026';

  constructor(private title: Title) {
    this.title.setTitle('Aviso Legal | Paraíso Para Saborear');
  }
}
