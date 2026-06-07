import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  CATEGORIAS,
  Categoria,
  TIPOS_DE_PLATO,
  TipoDePlato,
} from '../../shared/models/app.types';
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
  tiposDePlato = TIPOS_DE_PLATO;

  categorias: CategoriaItem[] = CATEGORIAS.map((cat) => ({
    nombre: cat,
    imagen: `assets/images/categories/${cat.toLowerCase().replaceAll(' ', '-')}.jpg`,
  }));

  constructor(
    private title: Title,
    private router: Router,
  ) {
    this.title.setTitle('Categorías | Paraíso Para Saborear');
  }

  verTipo(tipo: TipoDePlato): void {
    this.router.navigate(['/recetas'], { queryParams: { tipo: tipo } });
  }
}
