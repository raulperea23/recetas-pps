import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CATEGORIAS, Categoria } from '../../shared/models/app.types';
import { MatIcon } from '@angular/material/icon';

interface CategoriaItem {
  nombre: Categoria;
  imagen: string;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  categorias: CategoriaItem[] = CATEGORIAS.map((cat) => ({
    nombre: cat,
    imagen: `assets/images/categories/${cat.toLowerCase().replaceAll(' ', '-')}.jpg`,
  }));

  constructor(private title: Title) {
    this.title.setTitle('Categorías | Platos Para Siempre');
  }
}
