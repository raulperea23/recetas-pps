import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-compartir',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './compartir.component.html',
  styleUrl: './compartir.component.css',
  host: { '[class.solo-icono]': 'soloIcono' },
})
export class CompartirComponent implements OnDestroy {
  @Input({ required: true }) nombre = '';
  @Input() enlace = '';
  @Input() encabezado = 'Mira esta receta';
  @Input() soloIcono = false;
  @ViewChild('compartirRef') compartirRef?: ElementRef<HTMLElement>;

  menuCompartirAbierto = false;
  enlaceCopiado = false;
  private temporizador?: ReturnType<typeof setTimeout>;
  private destruido = false;
  private readonly snackBar = inject(MatSnackBar);

  toggleMenuCompartir(): void {
    clearTimeout(this.temporizador);
    this.menuCompartirAbierto = !this.menuCompartirAbierto;
    this.enlaceCopiado = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (
      this.menuCompartirAbierto &&
      event.target instanceof Node &&
      !this.compartirRef?.nativeElement.contains(event.target)
    ) {
      this.menuCompartirAbierto = false;
    }
  }

  compartirWhatsApp(): void {
    const texto = `${this.encabezado}: ${this.nombre} \n\n${this.enlace || window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
    this.menuCompartirAbierto = false;
  }

  async copiarEnlace(): Promise<void> {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(this.enlace || window.location.href);
      if (this.destruido) return;
      this.enlaceCopiado = true;
      clearTimeout(this.temporizador);
      this.temporizador = setTimeout(() => {
        this.enlaceCopiado = false;
        this.menuCompartirAbierto = false;
      }, 1500);
    } catch (error) {
      console.error('No se pudo copiar el enlace:', error);
      this.snackBar.open('No se pudo copiar el enlace. Inténtalo de nuevo.', 'Cerrar');
    }
  }

  ngOnDestroy(): void {
    this.destruido = true;
    clearTimeout(this.temporizador);
  }
}
