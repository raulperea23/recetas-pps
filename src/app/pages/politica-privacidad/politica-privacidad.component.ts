import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, MatButtonModule],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css',
})
export class PoliticaPrivacidadComponent {
  fechaActualizacion = '11 de agosto de 2026';

  constructor(private title: Title) {
    this.title.setTitle(
      'Política de Privacidad y Cookies | Paraíso Para Saborear',
    );
  }
}
