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
import { Router } from '@angular/router';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import {
  HistorialService,
  EntradaHistorial,
  CambioHistorial,
} from '../../shared/services/historial.service';
import { Receta, FotoReceta } from '../../shared/models/receta.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { TiptapEditorComponent } from '../../shared/components/tiptap-editor/tiptap-editor.component';
import { CambioDialogComponent } from '../../shared/components/cambio-dialog/cambio-dialog.component';
import { FraccionesDirective } from '../../shared/directives/fracciones.directive';
import {
  CATEGORIAS,
  DIFICULTADES,
  TIPOS_DE_PLATO,
  UNIDADES_TIEMPO,
} from '../../shared/models/app.types';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

interface SlotFoto {
  previsualizacion: string | null;
  archivo: File | null;
  urlActual: string | null;
  subiendo: boolean;
}

interface CardAdmin {
  nombre: string;
  icono: string;
  vista: string;
}

interface SeccionAdmin {
  titulo: string;
  cards: CardAdmin[];
}

const SECCIONES_ADMIN: SeccionAdmin[] = [
  {
    titulo: 'Recetas',
    cards: [
      { nombre: 'Nueva receta', icono: 'add_circle', vista: 'receta-nueva' },
      { nombre: 'Editar receta', icono: 'edit', vista: 'receta-editar' },
      {
        nombre: 'Visibilidad',
        icono: 'visibility',
        vista: 'receta-visibilidad',
      },
    ],
  },
  {
    titulo: 'Preparaciones',
    cards: [
      {
        nombre: 'Nueva preparación',
        icono: 'add_circle',
        vista: 'preparacion-nueva',
      },
      {
        nombre: 'Editar preparación',
        icono: 'edit',
        vista: 'preparacion-editar',
      },
      {
        nombre: 'Visibilidad',
        icono: 'visibility',
        vista: 'preparacion-visibilidad',
      },
    ],
  },
  {
    titulo: 'Trucos',
    cards: [
      { nombre: 'Nuevo truco', icono: 'add_circle', vista: 'truco-nuevo' },
      { nombre: 'Editar truco', icono: 'edit', vista: 'truco-editar' },
      {
        nombre: 'Visibilidad',
        icono: 'visibility',
        vista: 'truco-visibilidad',
      },
    ],
  },
  {
    titulo: 'Categorías de ingredientes',
    cards: [
      {
        nombre: 'Nueva categoría',
        icono: 'add_circle',
        vista: 'categoria-nueva',
      },
      { nombre: 'Editar categoría', icono: 'edit', vista: 'categoria-editar' },
      {
        nombre: 'Visibilidad',
        icono: 'visibility',
        vista: 'categoria-visibilidad',
      },
    ],
  },
  {
    titulo: 'Ingredientes',
    cards: [
      {
        nombre: 'Nuevo ingrediente',
        icono: 'add_circle',
        vista: 'ingrediente-nuevo',
      },
      {
        nombre: 'Editar ingrediente',
        icono: 'edit',
        vista: 'ingrediente-editar',
      },
      {
        nombre: 'Visibilidad',
        icono: 'visibility',
        vista: 'ingrediente-visibilidad',
      },
    ],
  },
  {
    titulo: 'Estadísticas',
    cards: [
      { nombre: 'Visitas', icono: 'insights', vista: 'visitas' },
      { nombre: 'Historial', icono: 'history', vista: 'historial' },
    ],
  },
];

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
    MatSlideToggleModule,
    MatDialogModule,
    TiptapEditorComponent,
    FraccionesDirective,
    DragDropModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  usuario: any = null;

  // NAVEGACIÓN
  vistaActual: string = 'dashboard';
  secciones = SECCIONES_ADMIN;

  // RECETAS
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  recetasOcultas: Receta[] = [];
  recetasVisibilidad: Receta[] = [];
  busquedaVisibilidad: string = '';
  recetaBuscada: Receta | null = null;
  busquedaEditar: string = '';
  formulario: FormGroup;
  editandoId: string | null = null;
  columnasVisibilidad = ['nombre', 'categoria', 'visible'];
  tiposDePlato = TIPOS_DE_PLATO;
  categorias = CATEGORIAS;
  dificultades = DIFICULTADES;
  unidadesTiempo = UNIDADES_TIEMPO;

  // Slots de fotos
  slots: SlotFoto[] = [
    { previsualizacion: null, archivo: null, urlActual: null, subiendo: false },
    { previsualizacion: null, archivo: null, urlActual: null, subiendo: false },
    { previsualizacion: null, archivo: null, urlActual: null, subiendo: false },
  ];
  get subiendoAlgunaImagen(): boolean {
    return this.slots.some((s) => s.subiendo);
  }

  // PREPARACIONES
  preparaciones: Preparacion[] = [];
  preparacionesFiltradas: Preparacion[] = [];
  preparacionesOcultas: Preparacion[] = [];
  busquedaPreparaciones: string = '';
  formularioPreparacion: FormGroup;
  editandoPreparacionId: string | null = null;
  columnasPreparaciones = ['orden', 'nombre', 'icono', 'acciones'];
  columnasVisibilidadPreparaciones = ['nombre', 'icono', 'visible'];

  // TRUCOS
  trucos: Truco[] = [];
  trucosFiltrados: Truco[] = [];
  trucosOcultos: Truco[] = [];
  busquedaTrucos: string = '';
  formularioTruco: FormGroup;
  editandoTrucoId: string | null = null;
  columnasTrucos = ['orden', 'nombre', 'icono', 'acciones'];
  columnasVisibilidadTrucos = ['nombre', 'icono', 'visible'];

  // INGREDIENTES
  ingredientesLista: Ingrediente[] = [];
  ingredientesFiltrados: Ingrediente[] = [];
  ingredientesOcultos: Ingrediente[] = [];
  busquedaIngredientes: string = '';
  formularioIngrediente: FormGroup;
  editandoIngredienteId: string | null = null;
  columnasIngredientes = ['nombre', 'emoji', 'categoria', 'acciones'];
  columnasVisibilidadIngredientes = ['nombre', 'emoji', 'categoria', 'visible'];
  categoriasIngredientes: CategoriaIngrediente[] = [];

  // CATEGORÍAS INGREDIENTES
  categoriasIngredientesLista: CategoriaIngrediente[] = [];
  categoriasFiltradas: CategoriaIngrediente[] = [];
  categoriasOcultas: CategoriaIngrediente[] = [];
  busquedaCategorias: string = '';
  formularioCategoriaIngrediente: FormGroup;
  editandoCategoriaIngredienteId: string | null = null;
  columnasCategorias = ['orden', 'nombre', 'acciones'];
  columnasVisibilidadCategorias = ['nombre', 'visible'];

  // VISITAS
  recetasMasVisitadas: Receta[] = [];
  columnasVisitas = ['nombre', 'visitas'];

  // HISTORIAL
  historial: EntradaHistorial[] = [];
  columnasHistorial = ['fecha', 'receta', 'cambios', 'ver', 'acciones'];

  constructor(
    private router: Router,
    private authService: AuthService,
    private recetasService: RecetasService,
    private storageService: StorageService,
    private preparacionesService: PreparacionesService,
    private trucosService: TrucosService,
    private ingredientesService: IngredientesService,
    private categoriasIngredientesService: CategoriasIngredientesService,
    private historialService: HistorialService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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
    this.historialService.getHistorial().subscribe((h) => (this.historial = h));
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin-login']);
  }

  // ── NAVEGACIÓN ──────────────────────────────────────────────────

  get tituloVista(): string {
    for (const seccion of this.secciones) {
      const card = seccion.cards.find((c) => c.vista === this.vistaActual);
      if (card) return card.nombre;
    }
    return '';
  }

  navegarA(vista: string): void {
    this.limpiarSeleccion();
    this.vistaActual = vista;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  volver(): void {
    this.navegarA('dashboard');
  }

  private limpiarSeleccion(): void {
    this.recetaBuscada = null;
    this.busquedaEditar = '';
    this.recetasFiltradas = [];
    this.busquedaVisibilidad = '';
    this.filtrarVisibilidad();
    this.resetFormulario();
    this.resetFormularioPreparacion();
    this.resetFormularioTruco();
    this.resetFormularioIngrediente();
    this.resetFormularioCategoriaIngrediente();
  }

  // ── SLOTS DE FOTOS ────────────────────────────────────────────────────────

  onImagenSeleccionada(event: any, index: number): void {
    const archivo = event.target.files[0];
    if (!archivo) return;
    this.slots[index].archivo = archivo;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.slots[index].previsualizacion = e.target.result;
    };
    reader.readAsDataURL(archivo);
    // Limpiar el input para permitir seleccionar el mismo archivo otra vez
    event.target.value = '';
  }

  eliminarSlot(index: number): void {
    this.slots[index] = {
      previsualizacion: null,
      archivo: null,
      urlActual: null,
      subiendo: false,
    };
  }

  private resetSlots(): void {
    this.slots = [
      {
        previsualizacion: null,
        archivo: null,
        urlActual: null,
        subiendo: false,
      },
      {
        previsualizacion: null,
        archivo: null,
        urlActual: null,
        subiendo: false,
      },
      {
        previsualizacion: null,
        archivo: null,
        urlActual: null,
        subiendo: false,
      },
    ];
  }

  private cargarSlotsDesdeReceta(receta: Receta): void {
    this.resetSlots();
    if (receta.fotos && receta.fotos.length > 0) {
      const fotosOrdenadas = [...receta.fotos].sort(
        (a, b) => a.orden - b.orden,
      );
      fotosOrdenadas.forEach((f, i) => {
        if (i < 3) {
          this.slots[i].urlActual = f.url;
          this.slots[i].previsualizacion = f.url;
        }
      });
    } else if (receta.foto) {
      // Receta con foto antigua (campo foto sin galería)
      this.slots[0].urlActual = receta.foto;
      this.slots[0].previsualizacion = receta.foto;
    }
  }

  private async subirFotosYObtenerArray(): Promise<FotoReceta[]> {
    const fotos: FotoReceta[] = [];
    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];
      if (slot.archivo) {
        // Hay un archivo nuevo que subir
        slot.subiendo = true;
        try {
          const url = await this.storageService.subirImagen(slot.archivo);
          fotos.push({ url, orden: i + 1 });
          slot.urlActual = url;
        } finally {
          slot.subiendo = false;
        }
      } else if (slot.urlActual) {
        // Mantener URL existente
        fotos.push({ url: slot.urlActual, orden: i + 1 });
      }
      // Si el slot está vacío, no se añade nada (foto eliminada)
    }
    return fotos;
  }

  // ── RECETAS ───────────────────────────────────────────────────────────────

  cargarRecetas(): void {
    this.recetasService.getTodasLasRecetas().subscribe((recetas) => {
      this.recetas = recetas;
      this.recetasOcultas = recetas.filter((r) => r.oculta === true);
      this.buscarParaEditar(this.busquedaEditar);
      this.filtrarVisibilidad();
      this.calcularRecetasMasVisitadas();
    });
  }

  private calcularRecetasMasVisitadas(): void {
    this.recetasMasVisitadas = [...this.recetas]
      .map((r) => ({ ...r, visitas: r.visitas ?? 0 }))
      .filter((r) => r.visitas! > 0)
      .sort((a, b) => b.visitas - a.visitas);
  }

  resetearVisitas(id: string): void {
    if (
      confirm('¿Seguro que quieres resetear a 0 las visitas de esta receta?')
    ) {
      this.recetasService.resetearVisitas(id).then(() => {
        this.calcularRecetasMasVisitadas();
      });
    }
  }

  buscarParaEditar(texto: string): void {
    this.busquedaEditar = texto;
    const busq = texto.toLowerCase().trim();
    this.recetasFiltradas = busq
      ? this.recetas.filter((r) => r.nombre.toLowerCase().includes(busq))
      : [];
  }

  seleccionarParaEditar(receta: Receta): void {
    this.editar(receta);
  }

  filtrarVisibilidad(): void {
    const busq = this.busquedaVisibilidad.toLowerCase().trim();
    this.recetasVisibilidad = busq
      ? this.recetas.filter((r) => r.nombre.toLowerCase().includes(busq))
      : this.recetas;
  }

  async toggleVisibilidadReceta(receta: Receta): Promise<void> {
    if (!receta.id) return;
    const oculta = receta.oculta !== true;
    await this.recetasService.toggleVisibilidad(receta.id, oculta);
    receta.oculta = oculta;
    this.recetasOcultas = this.recetas.filter((r) => r.oculta === true);
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

  dropIngrediente(event: CdkDragDrop<string[]>): void {
    const ingredientesArray = this.ingredientes.controls.map((c) => c.value);
    moveItemInArray(ingredientesArray, event.previousIndex, event.currentIndex);
    this.ingredientes.clear();
    ingredientesArray.forEach((val) =>
      this.ingredientes.push(this.fb.control(val)),
    );
  }

  async guardar(): Promise<void> {
    if (this.formulario.invalid) return;

    const fotos = await this.subirFotosYObtenerArray();
    const fotoPrincipal =
      fotos.length > 0 ? fotos[0].url : this.formulario.value.foto || '';

    const receta: any = {
      ...this.formulario.value,
      foto: fotoPrincipal,
      fechaPublicacion: new Date(),
    };

    if (fotos.length > 0) {
      receta.fotos = fotos;
    }

    if (this.editandoId) {
      // Obtener receta actual antes de guardar para el diff
      const recetaAntigua = this.recetas.find((r) => r.id === this.editandoId);
      if (recetaAntigua) {
        const cambios = this.generarDiff(recetaAntigua, receta);
        if (cambios.length > 0) {
          await this.historialService.guardarEntrada({
            recetaId: this.editandoId,
            recetaNombre: recetaAntigua.nombre,
            fecha: new Date(),
            cambios,
          });
        }
      }
      await this.recetasService.updateReceta(this.editandoId, receta);
      this.snackBar.open('Receta actualizada 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    } else {
      receta.oculta = false;
      await this.recetasService.addReceta(receta);
      this.snackBar.open('Receta creada 🎉', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-grande',
      });
    }
    this.resetFormulario();
  }

  private generarDiff(antiguo: any, nuevo: any): CambioHistorial[] {
    const camposIgnorados = ['fechaPublicacion', 'visitas', 'foto', 'fotos'];
    const cambios: CambioHistorial[] = [];

    const campos = Object.keys(nuevo).filter(
      (k) => !camposIgnorados.includes(k),
    );

    for (const campo of campos) {
      const vAntiguo = JSON.stringify(antiguo[campo] ?? null);
      const vNuevo = JSON.stringify(nuevo[campo] ?? null);
      if (vAntiguo !== vNuevo) {
        cambios.push({
          campo,
          valorAntiguo: antiguo[campo] ?? null,
          valorNuevo: nuevo[campo] ?? null,
        });
      }
    }
    return cambios;
  }

  editar(receta: Receta): void {
    this.vistaActual = 'receta-editar';
    this.recetaBuscada = receta;
    this.editandoId = receta.id || null;
    this.formulario.patchValue(receta);
    this.cargarSlotsDesdeReceta(receta);
    this.ingredientes.clear();
    receta.ingredientes.forEach((i: any) =>
      this.ingredientes.push(this.fb.control(i)),
    );
    this.formulario.patchValue({ elaboracion: receta.elaboracion });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  verCambio(entrada: EntradaHistorial): void {
    this.dialog.open(CambioDialogComponent, {
      data: {
        recetaNombre: entrada.recetaNombre,
        fecha: entrada.fecha,
        cambios: entrada.cambios,
      },
      width: '700px',
      maxWidth: '90vw',
    });
  }

  eliminarLog(id: string): void {
    if (confirm('¿Seguro que quieres eliminar este registro del historial?')) {
      this.historialService.eliminarEntrada(id);
    }
  }

  resetFormulario(): void {
    this.editandoId = null;
    this.recetaBuscada = null;
    this.resetSlots();
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

  // ── PREPARACIONES ─────────────────────────────────────────────────────────

  cargarPreparaciones(): void {
    this.preparacionesService
      .getTodasLasPreparaciones()
      .subscribe((preparaciones) => {
        this.preparaciones = preparaciones;
        this.preparacionesOcultas = preparaciones.filter(
          (p) => p.oculta === true,
        );
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
      await this.preparacionesService.addPreparacion({
        ...preparacion,
        oculta: false,
      });
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

  async toggleVisibilidadPreparacion(preparacion: Preparacion): Promise<void> {
    if (!preparacion.id) return;
    const oculta = preparacion.oculta !== true;
    await this.preparacionesService.toggleVisibilidad(preparacion.id, oculta);
    preparacion.oculta = oculta;
    this.preparacionesOcultas = this.preparaciones.filter(
      (p) => p.oculta === true,
    );
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

  // ── TRUCOS ────────────────────────────────────────────────────────────────

  cargarTrucos(): void {
    this.trucosService.getTodosLosTrucos().subscribe((trucos) => {
      this.trucos = trucos;
      this.trucosOcultos = trucos.filter((t) => t.oculta === true);
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
      await this.trucosService.addTruco({ ...truco, oculta: false });
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

  async toggleVisibilidadTruco(truco: Truco): Promise<void> {
    if (!truco.id) return;
    const oculta = truco.oculta !== true;
    await this.trucosService.toggleVisibilidad(truco.id, oculta);
    truco.oculta = oculta;
    this.trucosOcultos = this.trucos.filter((t) => t.oculta === true);
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

  // ── INGREDIENTES ──────────────────────────────────────────────────────────

  cargarIngredientes(): void {
    this.ingredientesService
      .getTodosLosIngredientes()
      .subscribe((ingredientes) => {
        this.ingredientesLista = ingredientes;
        this.ingredientesOcultos = ingredientes.filter(
          (i) => i.oculta === true,
        );
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
      await this.ingredientesService.addIngrediente({
        ...ingrediente,
        oculta: false,
      });
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

  async toggleVisibilidadIngrediente(ingrediente: Ingrediente): Promise<void> {
    if (!ingrediente.id) return;
    const oculta = ingrediente.oculta !== true;
    await this.ingredientesService.toggleVisibilidad(ingrediente.id, oculta);
    ingrediente.oculta = oculta;
    this.ingredientesOcultos = this.ingredientesLista.filter(
      (i) => i.oculta === true,
    );
  }

  resetFormularioIngrediente(): void {
    this.editandoIngredienteId = null;
    this.formularioIngrediente.reset();
  }

  // ── CATEGORÍAS INGREDIENTES ───────────────────────────────────────────────

  cargarCategoriasIngredientes(): void {
    this.categoriasIngredientesService
      .getTodasLasCategorias()
      .subscribe((categorias) => {
        this.categoriasIngredientesLista = categorias;
        this.categoriasIngredientes = categorias.filter(
          (c) => c.oculta !== true,
        );
        this.categoriasOcultas = categorias.filter((c) => c.oculta === true);
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
      await this.categoriasIngredientesService.addCategoria({
        ...categoria,
        oculta: false,
      });
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

  async toggleVisibilidadCategoria(
    categoria: CategoriaIngrediente,
  ): Promise<void> {
    if (!categoria.id) return;
    const oculta = categoria.oculta !== true;
    await this.categoriasIngredientesService.toggleVisibilidad(
      categoria.id,
      oculta,
    );
    categoria.oculta = oculta;
    this.categoriasOcultas = this.categoriasIngredientesLista.filter(
      (c) => c.oculta === true,
    );
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
