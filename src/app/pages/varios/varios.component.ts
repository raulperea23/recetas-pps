import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { PRODUCTOS, Producto } from '../../shared/models/app.types';
import { TablaDialogComponent } from '../../shared/components/tabla-dialog/tabla-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

interface ProductoItem {
  nombre: Producto;
  imagen: string;
}

@Component({
  selector: 'app-varios',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIcon, MatButton],
  templateUrl: './varios.component.html',
  styleUrl: './varios.component.css',
})
export class VariosComponent {
  productos: ProductoItem[] = PRODUCTOS.map((prod) => ({
    nombre: prod,
    imagen: `assets/images/products/${prod.toLowerCase().replaceAll(' ', '-')}.jpg`,
  }));

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private dialog: MatDialog,
  ) {
    this.title.setTitle('Varios | Platos Para Siempre');
  }

  productoClick(producto: ProductoItem) {
    this.dialog.open(TablaDialogComponent, {
      data: producto.nombre.toLowerCase().replaceAll(' ', '_'),
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }
}
