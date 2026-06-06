import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RecetasService } from '../../shared/services/recetas.service';
import { Receta } from '../../shared/models/receta.model';
import { Title } from '@angular/platform-browser';
import { CardComponent } from '../../shared/components/card/card.component';
import { CATEGORIAS, DIFICULTADES } from '../../shared/models/app.types';

const ORDEN_CATEGORIAS: { [key: string]: number } = {
  Desayuno: 1,
  Entrante: 2,
  'Plato principal': 3,
  'Segundo plato': 4,
  Postre: 5,
};

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CardComponent,
  ],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css',
})
export class RecetasComponent implements OnInit {
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  busqueda: string = '';
  categoriaSeleccionada: string = '';
  dificultadSeleccionada: string = '';
  todasLasRecetas: Receta[] = [];
  recetasMostradas: Receta[] = [];
  pagina: number = 1;
  recetasPorPagina: number = 12;
  hayMas: boolean = false;
  ordenActual: string = 'fecha';
  ordenAscendente: boolean = false;

  categorias = CATEGORIAS;
  dificultades = DIFICULTADES;

  constructor(
    private recetasService: RecetasService,
    private title: Title,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Recetas | Platos Para Siempre');

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['categoria']) {
        this.categoriaSeleccionada = queryParams['categoria'];
      }
      if (queryParams['dificultad']) {
        this.dificultadSeleccionada = queryParams['dificultad'];
      }
    });

    this.route.params.subscribe((params) => {
      if (params['categoria']) {
        this.categoriaSeleccionada = params['categoria'];
      }
      if (params['dificultad']) {
        this.dificultadSeleccionada = params['dificultad'];
      }
      this.recetasService.getRecetas().subscribe((recetas) => {
        this.todasLasRecetas = recetas;
        this.filtrar();
      });
    });
  }

  filtrar(): void {
    this.pagina = 1;
    const filtradas = this.todasLasRecetas.filter((receta) => {
      const coincideNombre = receta.nombre
        .toLowerCase()
        .includes(this.busqueda.toLowerCase());
      const coincideCategoria = this.categoriaSeleccionada
        ? receta.categoria === this.categoriaSeleccionada
        : true;
      const coincideDificultad = this.dificultadSeleccionada
        ? receta.dificultad === this.dificultadSeleccionada
        : true;
      return coincideNombre && coincideCategoria && coincideDificultad;
    });
    this.recetasFiltradas = filtradas;
    this.recetasMostradas = filtradas.slice(0, this.recetasPorPagina);
    this.hayMas = filtradas.length > this.recetasPorPagina;
  }

  ordenar(criterio: string): void {
    if (this.ordenActual === criterio) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.ordenActual = criterio;
      this.ordenAscendente = true;
    }

    this.recetasFiltradas = [...this.recetasFiltradas].sort((a, b) => {
      let comparacion = 0;
      switch (criterio) {
        case 'nombre':
          comparacion = a.nombre.localeCompare(b.nombre);
          break;
        case 'categoria':
          comparacion =
            (ORDEN_CATEGORIAS[a.categoria] || 99) -
            (ORDEN_CATEGORIAS[b.categoria] || 99);
          break;
        case 'fecha':
          comparacion =
            new Date(a.fechaPublicacion).getTime() -
            new Date(b.fechaPublicacion).getTime();
          break;
      }
      return this.ordenAscendente ? comparacion : -comparacion;
    });

    this.pagina = 1;
    this.recetasMostradas = this.recetasFiltradas.slice(
      0,
      this.recetasPorPagina,
    );
    this.hayMas = this.recetasFiltradas.length > this.recetasPorPagina;
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.categoriaSeleccionada = '';
    this.dificultadSeleccionada = '';
    this.filtrar();
  }

  cargarMas(): void {
    this.pagina++;
    const hasta = this.pagina * this.recetasPorPagina;
    this.recetasMostradas = this.recetasFiltradas.slice(0, hasta);
    this.hayMas = this.recetasFiltradas.length > hasta;
  }
}
