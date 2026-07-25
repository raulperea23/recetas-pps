import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';

const SALSA_COLORES: Record<string, { top: string; bottom: string }> = {
  agridulce: { top: '#ffb347', bottom: '#ff7e5f' },
  alioli: { top: '#fff8c6', bottom: '#f1c40f' },
  fruta: { top: '#ff6b81', bottom: '#c44569' },
  crema: { top: '#fffaf0', bottom: '#f5e6cc' },
  bilbaina: { top: '#ffcc66', bottom: '#ff7f50' },
  brava: { top: '#ff4d4d', bottom: '#d63031' },
  vino: { top: '#8e44ad', bottom: '#6c3483' },
  foie: { top: '#d2b48c', bottom: '#a67c52' },
  pimientos: { top: '#ff7675', bottom: '#d63031' },
  rosa: { top: '#ff9ff3', bottom: '#f368e0' },
  tomate: { top: '#ff6348', bottom: '#c0392b' },
  vinagreta: { top: '#7bed9f', bottom: '#2ecc71' },
  citrico: { top: '#ffeaa7', bottom: '#fdcb6e' },
};

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '400ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 }),
        ),
      ]),
    ]),
  ],
})
export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
  ) {}

  get salsaColorTop(): string {
    return SALSA_COLORES[this.data.tipoSalsa]?.top ?? '#ccc';
  }

  get salsaColorBottom(): string {
    return SALSA_COLORES[this.data.tipoSalsa]?.bottom ?? '#aaa';
  }
}
