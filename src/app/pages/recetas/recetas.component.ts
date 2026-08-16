import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RecetasService } from '../../shared/services/recetas.service';
import { Receta } from '../../shared/models/receta.model';
import { Title } from '@angular/platform-browser';
import { CardComponent } from '../../shared/components/card/card.component';
import {
  CATEGORIAS,
  TIPOS_DE_PLATO,
  DIFICULTADES,
} from '../../shared/models/app.types';
import { MatCheckboxModule } from '@angular/material/checkbox';

const ORDEN_TIPOS: { [key: string]: number } = {
  Desayuno: 1,
  Entrante: 2,
  'Plato principal': 3,
  'Segundo plato': 4,
  Postre: 5,
};

const ORDEN_DIFICULTADES: { [key: string]: number } = {
  Fácil: 1,
  Media: 2,
  Difícil: 3,
};

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatSelectModule,
    FormsModule,
    CardComponent,
    MatCheckboxModule,
    RouterLink,
  ],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css',
})
export class RecetasComponent implements OnInit {
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  busqueda: string = '';

  tituloPagina: string = 'Todas las recetas';

  filtrosVisibles: boolean = true;
  ordenacionesVisibles: boolean = true;

  categoriaSeleccionada: string = '';
  tipoSeleccionado: string = '';
  dificultadSeleccionada: string = '';
  todasLasRecetas: Receta[] = [];
  recetasMostradas: Receta[] = [];
  soloDestacadas: boolean = false;
  sinFoto: boolean = false;
  pagina: number = 1;
  recetasPorPagina: number = 12;
  hayMas: boolean = false;
  ordenActual: string = 'fecha';
  ordenAscendente: boolean = false;

  categorias = CATEGORIAS;
  tiposDePlato = TIPOS_DE_PLATO;
  dificultades = DIFICULTADES;

  constructor(
    private recetasService: RecetasService,
    private title: Title,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Recetas | Paraíso Para Saborear');

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['filtros']) {
        this.filtrosVisibles = queryParams['filtros'] === 'true';
      }
      if (queryParams['ordenacion']) {
        this.ordenacionesVisibles = queryParams['ordenacion'] === 'true';
      }
      if (queryParams['categoria']) {
        this.categoriaSeleccionada = queryParams['categoria'];
        this.tituloPagina = this.categoriaSeleccionada;
      }
      if (queryParams['tipo']) {
        this.tipoSeleccionado = queryParams['tipo'];
        if (this.tipoSeleccionado === 'Postre') {
          this.tituloPagina = 'Todos nuestros postres';
        }
      }
      if (queryParams['dificultad']) {
        this.dificultadSeleccionada = queryParams['dificultad'];
      }
      if (queryParams['destacadas']) {
        this.soloDestacadas = true;
        this.tituloPagina = 'Recetas destacadas';
      }
      if (queryParams['sinFoto']) {
        this.sinFoto = true;
        this.tituloPagina = 'Recetas sin foto';
      }
    });

    this.route.params.subscribe((params) => {
      if (params['categoria']) {
        this.categoriaSeleccionada = params['categoria'];
      }
      if (params['tipo']) {
        this.tipoSeleccionado = params['tipo'];
      }
      if (params['dificultad']) {
        this.dificultadSeleccionada = params['dificultad'];
      }
      if (params['destacadas']) {
        this.soloDestacadas = true;
      }
      if (params['sinFoto']) {
        this.sinFoto = true;
      }
      this.recetasService.getRecetas().subscribe((recetas) => {
        this.todasLasRecetas = recetas;
        this.filtrar();
      });
    });
  }

  // Elimina tildes y pasa a minúsculas para comparaciones
  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private tiempoEnMinutos(receta: Receta): number {
    const tiempo = receta.tiempoPreparacion ?? 0;
    const unidad = receta.tiempoUnidad ?? 'minutos';
    return unidad === 'horas' ? tiempo * 60 : tiempo;
  }

  filtrar(): void {
    this.pagina = 1;
    const busquedaNorm = this.normalizar(this.busqueda);

    const filtradas = this.todasLasRecetas.filter((receta) => {
      const coincideNombre = this.normalizar(receta.nombre).includes(
        busquedaNorm,
      );
      const coincideCategoria = this.categoriaSeleccionada
        ? receta.categoria === this.categoriaSeleccionada
        : true;
      const coincideTipo = this.tipoSeleccionado
        ? receta.tipoDePlato === this.tipoSeleccionado
        : true;
      const coincideDificultad = this.dificultadSeleccionada
        ? receta.dificultad === this.dificultadSeleccionada
        : true;
      const coincideDestacada = this.soloDestacadas
        ? receta.destacada === true
        : true;
      const coincideSinFoto = this.sinFoto ? !receta.foto : true;
      return (
        coincideNombre &&
        coincideCategoria &&
        coincideTipo &&
        coincideDificultad &&
        coincideDestacada &&
        coincideSinFoto
      );
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
            (ORDEN_TIPOS[a.categoria] || 99) - (ORDEN_TIPOS[b.categoria] || 99);
          break;
        case 'fecha':
          comparacion =
            new Date(a.fechaPublicacion as any).getTime() -
            new Date(b.fechaPublicacion as any).getTime();
          break;
        case 'tiempo':
          comparacion = this.tiempoEnMinutos(a) - this.tiempoEnMinutos(b);
          break;
        case 'dificultad':
          comparacion =
            (ORDEN_DIFICULTADES[a.dificultad] || 99) -
            (ORDEN_DIFICULTADES[b.dificultad] || 99);
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
    this.tipoSeleccionado = '';
    this.dificultadSeleccionada = '';
    this.soloDestacadas = false;
    this.sinFoto = false;
    this.filtrar();
  }

  cargarMas(): void {
    this.pagina++;
    const hasta = this.pagina * this.recetasPorPagina;
    this.recetasMostradas = this.recetasFiltradas.slice(0, hasta);
    this.hayMas = this.recetasFiltradas.length > hasta;
  }
}
