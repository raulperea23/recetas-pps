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
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../shared/services/auth.service';
import { RecetasService } from '../../shared/services/recetas.service';
import { StorageService } from '../../shared/services/storage.service';
import {
  PreparacionesService,
  Preparacion,
} from '../../shared/services/preparaciones.service';
import { TrucosService, Truco } from '../../shared/services/trucos.service';
import {
  IngredientesService,
  Ingrediente,
} from '../../shared/services/ingredientes.service';
import {
  CategoriasIngredientesService,
  CategoriaIngrediente,
} from '../../shared/services/categorias-ingredientes.service';
import { Receta } from '../../shared/models/receta.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import {
  CATEGORIAS,
  DIFICULTADES,
  TIPOS_DE_PLATO,
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
    MatTabsModule,
    QuillModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  usuario: any = null;

  // RECETAS
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  busquedaRecetas: string = '';
  formulario: FormGroup;
  editandoId: string | null = null;
  columnas = ['nombre', 'categoria', 'dificultad', 'acciones'];
  tiposDePlato = TIPOS_DE_PLATO;
  categorias = CATEGORIAS;
  dificultades = DIFICULTADES;
  unidadesTiempo = UNIDADES_TIEMPO;
  imagenSeleccionada: File | null = null;
  previsualizacion: string | null = null;
  subiendoImagen: boolean = false;

  // PREPARACIONES
  preparaciones: Preparacion[] = [];
  preparacionesFiltradas: Preparacion[] = [];
  busquedaPreparaciones: string = '';
  formularioPreparacion: FormGroup;
  editandoPreparacionId: string | null = null;
  columnasPreparaciones = ['orden', 'nombre', 'icono', 'acciones'];

  // TRUCOS
  trucos: Truco[] = [];
  trucosFiltrados: Truco[] = [];
  busquedaTrucos: string = '';
  formularioTruco: FormGroup;
  editandoTrucoId: string | null = null;
  columnasTrucos = ['orden', 'nombre', 'icono', 'acciones'];

  // INGREDIENTES
  ingredientesLista: Ingrediente[] = [];
  ingredientesFiltrados: Ingrediente[] = [];
  busquedaIngredientes: string = '';
  formularioIngrediente: FormGroup;
  editandoIngredienteId: string | null = null;
  columnasIngredientes = ['nombre', 'emoji', 'categoria', 'acciones'];
  categoriasIngredientes: CategoriaIngrediente[] = [];

  // CATEGORÍAS INGREDIENTES
  categoriasIngredientesLista: CategoriaIngrediente[] = [];
  categoriasFiltradas: CategoriaIngrediente[] = [];
  busquedaCategorias: string = '';
  formularioCategoriaIngrediente: FormGroup;
  editandoCategoriaIngredienteId: string | null = null;
  columnasCategorias = ['orden', 'nombre', 'acciones'];

  constructor(
    private authService: AuthService,
    private recetasService: RecetasService,
    private storageService: StorageService,
    private preparacionesService: PreparacionesService,
    private trucosService: TrucosService,
    private ingredientesService: IngredientesService,
    private categoriasIngredientesService: CategoriasIngredientesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private title: Title,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      origen: [''],
      tipoDePlato: ['', Validators.required],
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

    this.formularioPreparacion = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      icono: ['', Validators.required],
    });

    this.formularioTruco = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      icono: ['', Validators.required],
    });

    this.formularioIngrediente = this.fb.group({
      nombre: ['', Validators.required],
      emoji: ['', Validators.required],
      categoria: ['', Validators.required],
    });

    this.formularioCategoriaIngrediente = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Administración');
    this.cargarRecetas();
    this.cargarPreparaciones();
    this.cargarTrucos();
    this.cargarIngredientes();
    this.cargarCategoriasIngredientes();
  }

  logout(): void {
    this.authService.logout();
  }

  // RECETAS
  cargarRecetas(): void {
    this.recetasService.getRecetas().subscribe((recetas) => {
      this.recetas = recetas;
      this.filtrarRecetas();
    });
  }

  filtrarRecetas(): void {
    const busq = this.busquedaRecetas.toLowerCase().trim();
    this.recetasFiltradas = busq
      ? this.recetas.filter((r) => r.nombre.toLowerCase().includes(busq))
      : this.recetas;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      tipoDePlato: '',
      dificultad: 'Fácil',
      tiempoPreparacion: 30,
      tiempoUnidad: 'minutos',
      destacada: false,
    });
    this.ingredientes.clear();
    this.ingredientes.push(this.fb.control(''));
  }

  // PREPARACIONES
  cargarPreparaciones(): void {
    this.preparacionesService.getPreparaciones().subscribe((preparaciones) => {
      this.preparaciones = preparaciones;
      this.filtrarPreparaciones();
    });
  }

  filtrarPreparaciones(): void {
    const busq = this.busquedaPreparaciones.toLowerCase().trim();
    this.preparacionesFiltradas = busq
      ? this.preparaciones.filter((p) => p.nombre.toLowerCase().includes(busq))
      : this.preparaciones;
  }

  async guardarPreparacion(): Promise<void> {
    if (this.formularioPreparacion.invalid) return;
    const orden = this.preparaciones.length + 1;
    const preparacion: Preparacion = {
      ...this.formularioPreparacion.value,
      orden: this.editandoPreparacionId
        ? (this.preparaciones.find((p) => p.id === this.editandoPreparacionId)
            ?.orden ?? orden)
        : orden,
    };
    if (this.editandoPreparacionId) {
      await this.preparacionesService.updatePreparacion(
        this.editandoPreparacionId,
        preparacion,
      );
      this.snackBar.open('Preparación actualizada 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    } else {
      await this.preparacionesService.addPreparacion(preparacion);
      this.snackBar.open('Preparación creada 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    }
    this.resetFormularioPreparacion();
  }

  editarPreparacion(preparacion: Preparacion): void {
    this.editandoPreparacionId = preparacion.id || null;
    this.formularioPreparacion.patchValue(preparacion);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarPreparacion(id: string): void {
    if (confirm('¿Seguro que quieres eliminar esta preparación?')) {
      this.preparacionesService.deletePreparacion(id);
    }
  }

  resetFormularioPreparacion(): void {
    this.editandoPreparacionId = null;
    this.formularioPreparacion.reset();
  }

  async subirPreparacion(preparacion: Preparacion): Promise<void> {
    const index = this.preparaciones.findIndex((p) => p.id === preparacion.id);
    if (index <= 0) return;
    const anterior = this.preparaciones[index - 1];
    await this.preparacionesService.updatePreparacion(preparacion.id!, {
      orden: anterior.orden,
    });
    await this.preparacionesService.updatePreparacion(anterior.id!, {
      orden: preparacion.orden,
    });
  }

  async bajarPreparacion(preparacion: Preparacion): Promise<void> {
    const index = this.preparaciones.findIndex((p) => p.id === preparacion.id);
    if (index >= this.preparaciones.length - 1) return;
    const siguiente = this.preparaciones[index + 1];
    await this.preparacionesService.updatePreparacion(preparacion.id!, {
      orden: siguiente.orden,
    });
    await this.preparacionesService.updatePreparacion(siguiente.id!, {
      orden: preparacion.orden,
    });
  }

  // TRUCOS
  cargarTrucos(): void {
    this.trucosService.getTrucos().subscribe((trucos) => {
      this.trucos = trucos;
      this.filtrarTrucos();
    });
  }

  filtrarTrucos(): void {
    const busq = this.busquedaTrucos.toLowerCase().trim();
    this.trucosFiltrados = busq
      ? this.trucos.filter((t) => t.nombre.toLowerCase().includes(busq))
      : this.trucos;
  }

  async guardarTruco(): Promise<void> {
    if (this.formularioTruco.invalid) return;
    const orden = this.trucos.length + 1;
    const truco: Truco = {
      ...this.formularioTruco.value,
      orden: this.editandoTrucoId
        ? (this.trucos.find((t) => t.id === this.editandoTrucoId)?.orden ??
          orden)
        : orden,
    };
    if (this.editandoTrucoId) {
      await this.trucosService.updateTruco(this.editandoTrucoId, truco);
      this.snackBar.open('Truco actualizado 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    } else {
      await this.trucosService.addTruco(truco);
      this.snackBar.open('Truco creado 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    }
    this.resetFormularioTruco();
  }

  editarTruco(truco: Truco): void {
    this.editandoTrucoId = truco.id || null;
    this.formularioTruco.patchValue(truco);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarTruco(id: string): void {
    if (confirm('¿Seguro que quieres eliminar este truco?')) {
      this.trucosService.deleteTruco(id);
    }
  }

  resetFormularioTruco(): void {
    this.editandoTrucoId = null;
    this.formularioTruco.reset();
  }

  async subirTruco(truco: Truco): Promise<void> {
    const index = this.trucos.findIndex((t) => t.id === truco.id);
    if (index <= 0) return;
    const anterior = this.trucos[index - 1];
    await this.trucosService.updateTruco(truco.id!, { orden: anterior.orden });
    await this.trucosService.updateTruco(anterior.id!, { orden: truco.orden });
  }

  async bajarTruco(truco: Truco): Promise<void> {
    const index = this.trucos.findIndex((t) => t.id === truco.id);
    if (index >= this.trucos.length - 1) return;
    const siguiente = this.trucos[index + 1];
    await this.trucosService.updateTruco(truco.id!, { orden: siguiente.orden });
    await this.trucosService.updateTruco(siguiente.id!, { orden: truco.orden });
  }

  // INGREDIENTES
  cargarIngredientes(): void {
    this.ingredientesService.getIngredientes().subscribe((ingredientes) => {
      this.ingredientesLista = ingredientes;
      this.filtrarIngredientes();
    });
  }

  filtrarIngredientes(): void {
    const busq = this.busquedaIngredientes.toLowerCase().trim();
    this.ingredientesFiltrados = busq
      ? this.ingredientesLista.filter((i) =>
          i.nombre.toLowerCase().includes(busq),
        )
      : this.ingredientesLista;
  }

  async guardarIngrediente(): Promise<void> {
    if (this.formularioIngrediente.invalid) return;
    const ingrediente: Ingrediente = this.formularioIngrediente.value;
    if (this.editandoIngredienteId) {
      await this.ingredientesService.updateIngrediente(
        this.editandoIngredienteId,
        ingrediente,
      );
      this.snackBar.open('Ingrediente actualizado 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    } else {
      await this.ingredientesService.addIngrediente(ingrediente);
      this.snackBar.open('Ingrediente creado 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    }
    this.resetFormularioIngrediente();
  }

  editarIngrediente(ingrediente: Ingrediente): void {
    this.editandoIngredienteId = ingrediente.id || null;
    this.formularioIngrediente.patchValue(ingrediente);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarIngrediente(id: string): void {
    if (confirm('¿Seguro que quieres eliminar este ingrediente?')) {
      this.ingredientesService.deleteIngrediente(id);
    }
  }

  resetFormularioIngrediente(): void {
    this.editandoIngredienteId = null;
    this.formularioIngrediente.reset();
  }

  // CATEGORÍAS INGREDIENTES
  cargarCategoriasIngredientes(): void {
    this.categoriasIngredientesService
      .getCategorias()
      .subscribe((categorias) => {
        this.categoriasIngredientesLista = categorias;
        this.categoriasIngredientes = categorias;
        this.filtrarCategorias();
      });
  }

  filtrarCategorias(): void {
    const busq = this.busquedaCategorias.toLowerCase().trim();
    this.categoriasFiltradas = busq
      ? this.categoriasIngredientesLista.filter((c) =>
          c.nombre.toLowerCase().includes(busq),
        )
      : this.categoriasIngredientesLista;
  }

  async guardarCategoriaIngrediente(): Promise<void> {
    if (this.formularioCategoriaIngrediente.invalid) return;
    const orden = this.categoriasIngredientesLista.length + 1;
    const categoria: CategoriaIngrediente = {
      ...this.formularioCategoriaIngrediente.value,
      orden: this.editandoCategoriaIngredienteId
        ? (this.categoriasIngredientesLista.find(
            (c) => c.id === this.editandoCategoriaIngredienteId,
          )?.orden ?? orden)
        : orden,
    };
    if (this.editandoCategoriaIngredienteId) {
      await this.categoriasIngredientesService.updateCategoria(
        this.editandoCategoriaIngredienteId,
        categoria,
      );
      this.snackBar.open('Categoría actualizada 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    } else {
      await this.categoriasIngredientesService.addCategoria(categoria);
      this.snackBar.open('Categoría creada 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    }
    this.resetFormularioCategoriaIngrediente();
  }

  editarCategoriaIngrediente(categoria: CategoriaIngrediente): void {
    this.editandoCategoriaIngredienteId = categoria.id || null;
    this.formularioCategoriaIngrediente.patchValue(categoria);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarCategoriaIngrediente(id: string): void {
    if (confirm('¿Seguro que quieres eliminar esta categoría?')) {
      this.categoriasIngredientesService.deleteCategoria(id);
    }
  }

  resetFormularioCategoriaIngrediente(): void {
    this.editandoCategoriaIngredienteId = null;
    this.formularioCategoriaIngrediente.reset();
  }

  async subirCategoria(categoria: CategoriaIngrediente): Promise<void> {
    const index = this.categoriasIngredientesLista.findIndex(
      (c) => c.id === categoria.id,
    );
    if (index <= 0) return;
    const anterior = this.categoriasIngredientesLista[index - 1];
    await this.categoriasIngredientesService.updateCategoria(categoria.id!, {
      orden: anterior.orden,
    });
    await this.categoriasIngredientesService.updateCategoria(anterior.id!, {
      orden: categoria.orden,
    });
  }

  async bajarCategoria(categoria: CategoriaIngrediente): Promise<void> {
    const index = this.categoriasIngredientesLista.findIndex(
      (c) => c.id === categoria.id,
    );
    if (index >= this.categoriasIngredientesLista.length - 1) return;
    const siguiente = this.categoriasIngredientesLista[index + 1];
    await this.categoriasIngredientesService.updateCategoria(categoria.id!, {
      orden: siguiente.orden,
    });
    await this.categoriasIngredientesService.updateCategoria(siguiente.id!, {
      orden: categoria.orden,
    });
  }
}
