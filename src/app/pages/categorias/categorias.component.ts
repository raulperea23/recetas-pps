import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import {
  CATEGORIAS,
  Categoria,
  CATEGORIAS_NOMBRES_IMGS,
  TIPOS_DE_PLATO,
  TipoDePlato,
  TIPOS_DE_PLATO_PLURALES,
} from '../../shared/models/app.types';
import { MatIcon } from '@angular/material/icon';

interface CategoriaItem {
  nombre: Categoria;
  imagen: string;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, MatButtonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  tiposDePlato = TIPOS_DE_PLATO;
  tiposDePlatoPlurales = TIPOS_DE_PLATO_PLURALES;

  nombresCategoriasParaImagenes = CATEGORIAS_NOMBRES_IMGS;
  categorias: CategoriaItem[] = CATEGORIAS.map((cat) => ({
    nombre: cat,
    imagen: `assets/images/categories/${this.nombresCategoriasParaImagenes[cat]}.webp`,
  }));

  constructor(
    private title: Title,
    private router: Router,
  ) {
    this.title.setTitle('Categorías | Paraíso Para Saborear');
  }

  verTipo(tipo: TipoDePlato): void {
    this.router.navigate(['/recetas'], {
      queryParams: { tipo: tipo, filtros: false, ordenacion: false },
    });
  }

  verCategoria(categoria: Categoria): void {
    this.router.navigate(['/recetas'], {
      queryParams: { categoria: categoria, filtros: false, ordenacion: false },
    });
  }
}
