import { Component, Inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { SALSA_COLORES } from '../../models/salsa-colores';
import { CompartirComponent } from '../compartir/compartir.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CompartirComponent,
    A11yModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private router: Router,
    private location: Location,
  ) {}

  get enlaceCompartir(): string {
    const tipo = this.data.tipoEnlace ?? this.data.tipo;
    const url = this.router.createUrlTree(['/'], {
      queryParams: { modal: `${tipo}:${this.data.id}` },
    });
    return new URL(
      this.location.prepareExternalUrl(this.router.serializeUrl(url)),
      window.location.origin,
    ).href;
  }

  get encabezadoCompartir(): string {
    if (this.data.tipo === 'salsa') return 'Mira esta salsa';
    if (this.data.tipoEnlace === 'preparacion') return 'Mira esta preparación';
    return 'Mira este truco';
  }

  get salsaColorTop(): string {
    return SALSA_COLORES[this.data.tipoSalsa]?.top ?? '#ccc';
  }

  get salsaColorBottom(): string {
    return SALSA_COLORES[this.data.tipoSalsa]?.bottom ?? '#aaa';
  }
}
