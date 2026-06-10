import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  IngredientesService,
  Ingrediente,
} from '../../shared/services/ingredientes.service';
import { CategoriasIngredientesService } from '../../shared/services/categorias-ingredientes.service';
import { RecetasService } from '../../shared/services/recetas.service';
import { Receta } from '../../shared/models/receta.model';
import { CardComponent } from '../../shared/components/card/card.component';

interface CategoriaConIngredientes {
  nombre: string;
  ingredientes: Ingrediente[];
  abierta: boolean;
}

@Component({
  selector: 'app-constructor-recetas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    CardComponent,
  ],
  templateUrl: './constructor-recetas.component.html',
  styleUrl: './constructor-recetas.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class ConstructorRecetasComponent implements OnInit {
  categorias: CategoriaConIngredientes[] = [];
  ingredientesSeleccionados: Ingrediente[] = [];
  todasLasRecetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  cargando: boolean = true;

  constructor(
    private title: Title,
    private ingredientesService: IngredientesService,
    private recetasService: RecetasService,
    private categoriasIngredientesService: CategoriasIngredientesService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('¿Qué cocinamos hoy? | Platos Para Siempre');

    this.categoriasIngredientesService
      .getCategorias()
      .subscribe((categorias) => {
        this.ingredientesService.getIngredientes().subscribe((ingredientes) => {
          this.categorias = categorias
            .map((cat) => ({
              nombre: cat.nombre,
              ingredientes: ingredientes.filter(
                (i) => i.categoria === cat.nombre,
              ),
              abierta: false,
            }))
            .filter((c) => c.ingredientes.length > 0);
          this.cargando = false;
        });
      });

    this.recetasService.getRecetas().subscribe((recetas) => {
      this.todasLasRecetas = recetas;
    });
  }

  toggleCategoria(categoria: CategoriaConIngredientes): void {
    categoria.abierta = !categoria.abierta;
  }

  onTapIngrediente(ingrediente: Ingrediente): void {
    if (this.estaSeleccionado(ingrediente)) {
      this.quitarIngrediente(ingrediente);
    } else {
      this.añadirIngrediente(ingrediente);
    }
  }

  añadirIngrediente(ingrediente: Ingrediente): void {
    if (!this.estaSeleccionado(ingrediente)) {
      this.ingredientesSeleccionados = [
        ...this.ingredientesSeleccionados,
        ingrediente,
      ];
      this.filtrarRecetas();
    }
  }

  quitarIngrediente(ingrediente: Ingrediente): void {
    this.ingredientesSeleccionados = this.ingredientesSeleccionados.filter(
      (i) => i.id !== ingrediente.id,
    );
    this.filtrarRecetas();
  }

  estaSeleccionado(ingrediente: Ingrediente): boolean {
    return this.ingredientesSeleccionados.some((i) => i.id === ingrediente.id);
  }

  limpiarSeleccion(): void {
    this.ingredientesSeleccionados = [];
    this.recetasFiltradas = [];
  }

  filtrarRecetas(): void {
    if (this.ingredientesSeleccionados.length === 0) {
      this.recetasFiltradas = [];
      return;
    }
    const nombresSeleccionados = this.ingredientesSeleccionados.map((i) =>
      i.nombre.toLowerCase(),
    );
    this.recetasFiltradas = this.todasLasRecetas.filter((receta) => {
      const ingredientesReceta = receta.ingredientes.map((ing: string) =>
        ing.toLowerCase(),
      );
      return nombresSeleccionados.every((nombre) =>
        ingredientesReceta.some((ing) => ing.includes(nombre)),
      );
    });
  }
}
