import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { RecetasService } from '../../shared/services/recetas.service';
import {
  PreparacionesService,
  Preparacion,
} from '../../shared/services/preparaciones.service';
import { TrucosService, Truco } from '../../shared/services/trucos.service';
import { Receta } from '../../shared/models/receta.model';
import { CardComponent } from '../../shared/components/card/card.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SALSAS, Salsa } from './home.salsas';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    CardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  destacadas: Receta[] = [];
  ultimas: Receta[] = [];
  postresDestacados: Receta[] = [];
  postres: Receta[] = [];
  sugerenciaAleatoria: Receta | null = null;
  recetaAleatoria: Receta | null = null;
  todasLasRecetas: Receta[] = [];

  trucos: Truco[] = [];
  salsas = SALSAS;
  preparaciones: Preparacion[] = [];

  constructor(
    private recetasService: RecetasService,
    private preparacionesService: PreparacionesService,
    private trucosService: TrucosService,
    private title: Title,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Paraíso Para Saborear');

    this.recetasService.getRecetasDestacadas().subscribe((recetas: any) => {
      this.destacadas = recetas;
    });

    this.recetasService.getRecetas().subscribe((recetas) => {
      this.todasLasRecetas = recetas;
      this.ultimas = recetas.slice(0, 6);
      this.postresDestacados = recetas
        .filter((r) => r.tipoDePlato === 'Postre' && r.destacada === true)
        .slice(0, 3);
      this.postres = recetas
        .filter((r) => r.tipoDePlato === 'Postre')
        .slice(0, 5);
      this.cargarSugerenciaAleatoria();
      this.cargarRecetaAleatoria();
    });

    this.preparacionesService.getPreparaciones().subscribe((preparaciones) => {
      this.preparaciones = preparaciones;
    });

    this.trucosService.getTrucos().subscribe((trucos) => {
      this.trucos = trucos;
    });
  }

  cargarSugerenciaAleatoria(): void {
    if (this.todasLasRecetas.length > 0) {
      let recetasDestacadas = this.todasLasRecetas.filter(
        (r) => r.destacada === true,
      );
      const indice = Math.floor(Math.random() * recetasDestacadas.length);
      this.sugerenciaAleatoria = recetasDestacadas[indice];
    }
  }

  cargarRecetaAleatoria(): void {
    if (this.todasLasRecetas.length > 0) {
      const indice = Math.floor(Math.random() * this.todasLasRecetas.length);
      this.recetaAleatoria = this.todasLasRecetas[indice];
    }
  }

  abrirModalDeSugerencia(): void {
    if (this.sugerenciaAleatoria) {
      this.dialog.open(ModalComponent, {
        data: this.sugerenciaAleatoria,
        maxWidth: '560px',
        width: '100%',
        panelClass: 'modal-aleatoria',
      });
    }
  }

  abrirModalDeAleatoria(): void {
    if (this.recetaAleatoria) {
      this.dialog.open(ModalComponent, {
        data: this.recetaAleatoria,
        maxWidth: '560px',
        width: '100%',
        panelClass: 'modal-aleatoria',
      });
    }
  }

  verDestacadas(): void {
    this.router.navigate(['/recetas'], { queryParams: { destacadas: true } });
  }

  abrirModalDeInfo(item: Truco | Preparacion): void {
    this.dialog.open(ModalComponent, {
      data: { tipo: 'truco', ...item },
      maxWidth: '820px',
      width: '100%',
      panelClass: 'modal-truco',
    });
  }

  verSalsa(salsa: Salsa): void {
    this.dialog.open(ModalComponent, {
      data: { tipo: 'salsa', ...salsa },
      maxWidth: '820px',
      width: '100%',
      panelClass: 'modal-salsa',
    });
  }

  verPostres(): void {
    this.router.navigate(['/recetas'], { queryParams: { tipo: 'Postre' } });
  }

  onImageError(event: any): void {
    event.target.onerror = null;
    event.target.src = 'assets/images/placeholder.png';
  }
}
