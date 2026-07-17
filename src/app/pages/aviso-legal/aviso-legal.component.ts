import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './aviso-legal.component.html',
  styleUrl: './aviso-legal.component.css',
})
export class AvisoLegalComponent {
  fechaActualizacion = '18 de julio de 2026';

  constructor(private title: Title) {
    this.title.setTitle('Aviso Legal | Paraíso Para Saborear');
  }
}
