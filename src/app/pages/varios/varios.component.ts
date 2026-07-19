import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { PRODUCTOS, Producto } from '../../shared/models/app.types';
import { TablaDialogComponent } from '../../shared/components/tabla-dialog/tabla-dialog.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FotoDialogComponent } from '../../shared/components/foto-dialog/foto-dialog.component';

interface ProductoItem {
  nombre: Producto;
  imagen: string;
}

interface MesItem {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-varios',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButton, MatButtonModule, RouterLink],
  templateUrl: './varios.component.html',
  styleUrl: './varios.component.css',
})
export class VariosComponent {
  productos: ProductoItem[] = PRODUCTOS.map((prod) => ({
    nombre: prod,
    imagen: `assets/images/products/${prod.toLowerCase().replaceAll(' ', '-')}.webp`,
  }));

  meses: MesItem[] = [
    { nombre: 'Enero', imagen: 'assets/images/months/enero.webp' },
    { nombre: 'Febrero', imagen: 'assets/images/months/febrero.webp' },
    { nombre: 'Marzo', imagen: 'assets/images/months/marzo.webp' },
    { nombre: 'Abril', imagen: 'assets/images/months/abril.webp' },
    { nombre: 'Mayo', imagen: 'assets/images/months/mayo.webp' },
    { nombre: 'Junio', imagen: 'assets/images/months/junio.webp' },
    { nombre: 'Julio', imagen: 'assets/images/months/julio.webp' },
    { nombre: 'Agosto', imagen: 'assets/images/months/agosto.webp' },
    { nombre: 'Septiembre', imagen: 'assets/images/months/septiembre.webp' },
    { nombre: 'Octubre', imagen: 'assets/images/months/octubre.webp' },
    { nombre: 'Noviembre', imagen: 'assets/images/months/noviembre.webp' },
    { nombre: 'Diciembre', imagen: 'assets/images/months/diciembre.webp' },
  ];

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private dialog: MatDialog,
  ) {
    this.title.setTitle('Varios | Paraíso Para Saborear');
  }

  productoClick(producto: ProductoItem) {
    this.dialog.open(TablaDialogComponent, {
      data: producto.nombre.toLowerCase().replaceAll(' ', '_'),
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }

  abrirFotoMes(mes: MesItem): void {
    this.dialog.open(FotoDialogComponent, {
      data: { foto: mes.imagen, nombre: mes.nombre },
      width: '75vw',
      maxWidth: '75vw',
      panelClass: 'foto-dialog',
    });
  }
}
