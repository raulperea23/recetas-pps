import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CambioHistorial } from '../../services/historial.service';

export interface CambioDialogData {
  recetaNombre: string;
  fecha: any;
  cambios: CambioHistorial[];
}

@Component({
  selector: 'app-cambio-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './cambio-dialog.component.html',
  styleUrl: './cambio-dialog.component.css',
})
export class CambioDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CambioDialogData) {}

  get fechaLegible(): Date | null {
    const fecha: any = this.data.fecha;
    if (!fecha) return null;
    return fecha.toDate ? fecha.toDate() : new Date(fecha);
  }

  formatearValor(valor: any): string {
    if (valor === null || valor === undefined || valor === '') return '(vacío)';
    if (typeof valor === 'boolean') return valor ? 'Sí' : 'No';
    if (typeof valor === 'string') return this.limpiarHtml(valor);
    if (Array.isArray(valor))
      return valor.map((v) => `• ${this.formatearValor(v)}`).join('\n');
    return JSON.stringify(valor, null, 2);
  }

  // El campo "elaboración" se guarda como HTML del editor; aquí se muestra como texto plano.
  private limpiarHtml(texto: string): string {
    if (!/<[a-z][\s\S]*>/i.test(texto)) return texto;
    return texto
      .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<li[^>]*>/gi, '• ')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
}
