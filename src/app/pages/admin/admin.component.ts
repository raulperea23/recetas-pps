import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../shared/services/auth.service';
import { RecetasService } from '../../shared/services/recetas.service';
import { StorageService } from '../../shared/services/storage.service';
import { Receta } from '../../shared/models/receta.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import {
  CATEGORIAS,
  DIFICULTADES,
  UNIDADES_TIEMPO,
} from '../../shared/models/app.types';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    QuillModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  usuario: any = null;

  recetas: Receta[] = [];
  formulario: FormGroup;
  editandoId: string | null = null;
  columnas = ['nombre', 'categoria', 'dificultad', 'acciones'];

  categorias = CATEGORIAS;
  dificultades = DIFICULTADES;
  unidadesTiempo = UNIDADES_TIEMPO;

  imagenSeleccionada: File | null = null;
  previsualizacion: string | null = null;
  subiendoImagen: boolean = false;

  constructor(
    private authService: AuthService,
    private recetasService: RecetasService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private title: Title,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      origen: [''],
      categoria: ['', Validators.required],
      foto: [''],
      ingredientes: this.fb.array([this.fb.control('')]),
      elaboracion: ['', Validators.required],
      comensales: [4, Validators.required],
      dificultad: ['Fácil', Validators.required],
      tiempoPreparacion: [30, Validators.required],
      tiempoUnidad: ['minutos', Validators.required],
      destacada: [false],
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Administración');
    this.cargarRecetas();
  }

  logout(): void {
    this.authService.logout();
  }

  cargarRecetas(): void {
    this.recetasService.getRecetas().subscribe((recetas) => {
      this.recetas = recetas;
    });
  }

  get ingredientes(): FormArray {
    return this.formulario.get('ingredientes') as FormArray;
  }

  addIngrediente(): void {
    this.ingredientes.push(this.fb.control(''));
  }

  removeIngrediente(i: number): void {
    this.ingredientes.removeAt(i);
  }

  onImagenSeleccionada(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      this.imagenSeleccionada = archivo;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previsualizacion = e.target.result;
      };
      reader.readAsDataURL(archivo);
    }
  }

  async guardar(): Promise<void> {
    if (this.formulario.invalid) return;

    this.subiendoImagen = true;

    let fotoUrl = this.formulario.value.foto;

    if (this.imagenSeleccionada) {
      fotoUrl = await this.storageService.subirImagen(this.imagenSeleccionada);
    }

    const receta: Receta = {
      ...this.formulario.value,
      foto: fotoUrl,
      fechaPublicacion: new Date(),
    };

    if (this.editandoId) {
      await this.recetasService.updateReceta(this.editandoId, receta);
      this.snackBar.open('Receta actualizada 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    } else {
      await this.recetasService.addReceta(receta);
      this.snackBar.open('Receta creada 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    }

    this.subiendoImagen = false;
    this.resetFormulario();
  }

  editar(receta: Receta): void {
    this.editandoId = receta.id || null;
    this.formulario.patchValue(receta);
    this.previsualizacion = receta.foto || null;

    this.ingredientes.clear();
    receta.ingredientes.forEach((i: any) =>
      this.ingredientes.push(this.fb.control(i)),
    );

    this.formulario.patchValue({ elaboracion: receta.elaboracion });
  }

  eliminar(id: string): void {
    if (confirm('¿Seguro que quieres eliminar esta receta?')) {
      this.recetasService.deleteReceta(id);
    }
  }

  resetFormulario(): void {
    this.editandoId = null;
    this.imagenSeleccionada = null;
    this.previsualizacion = null;
    this.formulario.reset({
      comensales: 4,
      dificultad: 'Fácil',
      tiempoPreparacion: 30,
      tiempoUnidad: 'minutos',
      destacada: false,
    });
    this.ingredientes.clear();
    this.ingredientes.push(this.fb.control(''));
  }
}
