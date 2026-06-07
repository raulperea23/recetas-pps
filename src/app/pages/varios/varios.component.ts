import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { PRODUCTOS, Producto } from '../../shared/models/app.types';
import { TablaDialogComponent } from '../../shared/components/tabla-dialog/tabla-dialog.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
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
  imports: [CommonModule, MatIcon, MatButton, RouterLink],
  templateUrl: './varios.component.html',
  styleUrl: './varios.component.css',
})
export class VariosComponent {
  productos: ProductoItem[] = PRODUCTOS.map((prod) => ({
    nombre: prod,
    imagen: `assets/images/products/${prod.toLowerCase().replaceAll(' ', '-')}.jpg`,
  }));

  meses: MesItem[] = [
    { nombre: 'Enero', imagen: 'assets/images/months/enero.png' },
    { nombre: 'Febrero', imagen: 'assets/images/months/febrero.png' },
    { nombre: 'Marzo', imagen: 'assets/images/months/marzo.png' },
    { nombre: 'Abril', imagen: 'assets/images/months/abril.png' },
    { nombre: 'Mayo', imagen: 'assets/images/months/mayo.png' },
    { nombre: 'Junio', imagen: 'assets/images/months/junio.png' },
    { nombre: 'Julio', imagen: 'assets/images/months/julio.png' },
    { nombre: 'Agosto', imagen: 'assets/images/months/agosto.png' },
    { nombre: 'Septiembre', imagen: 'assets/images/months/septiembre.png' },
    { nombre: 'Octubre', imagen: 'assets/images/months/octubre.png' },
    { nombre: 'Noviembre', imagen: 'assets/images/months/noviembre.png' },
    { nombre: 'Diciembre', imagen: 'assets/images/months/diciembre.png' },
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
      maxWidth: '75vw',
      // maxHeight: '95vh',
      width: '55vw',
      panelClass: 'foto-dialog',
    });
  }
}
