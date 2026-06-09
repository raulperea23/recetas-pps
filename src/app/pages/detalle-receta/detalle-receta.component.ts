import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RecetasService } from '../../shared/services/recetas.service';
import { Receta } from '../../shared/models/receta.model';
import { Title } from '@angular/platform-browser';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FotoDialogComponent } from '../../shared/components/foto-dialog/foto-dialog.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-detalle-receta',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    QuillModule,
    MatCardModule,
  ],
  templateUrl: './detalle-receta.component.html',
  styleUrl: './detalle-receta.component.css',
})
export class DetalleRecetaComponent implements OnInit {
  receta: Receta | null = null;
  recetasRelacionadas: Receta[] = [];

  constructor(
    private route: ActivatedRoute,
    private recetasService: RecetasService,
    private title: Title,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.receta = null;
        this.recetasRelacionadas = [];

        this.recetasService.getRecetaPorId(id).subscribe((receta) => {
          this.receta = receta;
          this.title.setTitle(`${receta.nombre} | PPS Recetas`);

          this.recetasService
            .getRecetasPorCategoria(receta.categoria, id)
            .subscribe((relacionadas) => {
              this.recetasRelacionadas = relacionadas.slice(0, 3);
            });
        });
      }
    });
  }

  get elaboracionFormateada(): string {
    return this.receta?.elaboracion?.replace(/&nbsp;/g, ' ') || '';
  }

  abrirFoto(): void {
    this.dialog.open(FotoDialogComponent, {
      data: { foto: this.receta?.foto, nombre: this.receta?.nombre },
      width: '85vw',
      maxWidth: '85vw',
      panelClass: 'foto-dialog',
    });
  }

  tieneFoto(): boolean {
    return !!this.receta?.foto && this.receta.foto.trim() !== '';
  }
}
