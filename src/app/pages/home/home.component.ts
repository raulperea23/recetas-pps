import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { RecetasService } from '../../shared/services/recetas.service';
import { Receta } from '../../shared/models/receta.model';
import { CardComponent } from '../../shared/components/card/card.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';

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
  sugerenciaAleatoria: Receta | null = null;
  recetaAleatoria: Receta | null = null;
  todasLasRecetas: Receta[] = [];

  constructor(
    private recetasService: RecetasService,
    private title: Title,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Inicio');

    this.recetasService.getRecetasDestacadas().subscribe((recetas: any) => {
      this.destacadas = recetas;
    });

    this.recetasService.getRecetas().subscribe((recetas) => {
      this.todasLasRecetas = recetas;
      this.ultimas = recetas.slice(0, 6);
      this.cargarSugerenciaAleatoria();
      this.cargarRecetaAleatoria();
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
}
