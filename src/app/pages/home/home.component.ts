import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { RecetasService } from '../../shared/services/recetas.service';
import {
  PreparacionesService,
  Preparacion,
} from '../../shared/services/preparaciones.service';
import { TrucosService, Truco } from '../../shared/services/trucos.service';
import { Receta } from '../../shared/models/receta.model';
import { CardComponent } from '../../shared/components/card/card.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SALSAS, Salsa } from './home.salsas';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    CardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  destacadas: Receta[] = [];
  ultimas: Receta[] = [];
  postresDestacados: Receta[] = [];
  postres: Receta[] = [];
  sugerenciaAleatoria: Receta | null = null;
  recetaAleatoria: Receta | null = null;
  todasLasRecetas: Receta[] = [];

  trucos: Truco[] = [];
  salsas = SALSAS;
  preparaciones: Preparacion[] = [];

  readonly LIMITE_MOBILE = 4;
  isMobile = false;
  isDesktop = false;
  limitPreparaciones = 4;
  limitTrucos = 4;

  get preparacionesVisibles(): Preparacion[] {
    if (this.isMobile && !this.mostrarTodasPreparaciones) {
      return this.preparaciones.slice(0, this.limitPreparaciones);
    }
    return this.preparaciones;
  }

  get trucosVisibles(): Truco[] {
    if (this.isMobile && !this.mostrarTodosTrucos) {
      return this.trucos.slice(0, this.limitTrucos);
    }
    return this.trucos;
  }

  get hayMasPreparaciones(): boolean {
    return this.isMobile && this.limitPreparaciones < this.preparaciones.length;
  }

  get hayMasTrucos(): boolean {
    return this.isMobile && this.limitTrucos < this.trucos.length;
  }

  mostrarTodasPreparaciones = false;
  mostrarTodosTrucos = false;

  verMasPreparaciones(): void {
    this.limitPreparaciones += this.LIMITE_MOBILE;
  }

  verMasTrucos(): void {
    this.limitTrucos += this.LIMITE_MOBILE;
  }

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth > 1240;
    this.isMobile = window.innerWidth <= 768;
  }

  constructor(
    private recetasService: RecetasService,
    private preparacionesService: PreparacionesService,
    private trucosService: TrucosService,
    private title: Title,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isDesktop = window.innerWidth > 1240;
    this.isMobile = window.innerWidth <= 768;
    this.title.setTitle('Paraíso Para Saborear');

    this.recetasService.getRecetasDestacadas().subscribe((recetas: any) => {
      this.destacadas = recetas.slice(
        0,
        this.isMobile || this.isDesktop ? 4 : 6,
      );
    });

    this.recetasService.getRecetas().subscribe((recetas) => {
      this.todasLasRecetas = recetas;
      const haceUnMes = new Date();
      haceUnMes.setMonth(haceUnMes.getMonth() - 1);

      this.ultimas = recetas
        .sort((a, b) => {
          const fechaA = (a.fechaPublicacion as any)?.toDate
            ? (a.fechaPublicacion as any).toDate().getTime()
            : new Date(a.fechaPublicacion as any).getTime();
          const fechaB = (b.fechaPublicacion as any)?.toDate
            ? (b.fechaPublicacion as any).toDate().getTime()
            : new Date(b.fechaPublicacion as any).getTime();
          return fechaB - fechaA;
        })
        .filter((r) => {
          const fecha = (r.fechaPublicacion as any)?.toDate
            ? (r.fechaPublicacion as any).toDate()
            : new Date(r.fechaPublicacion as any);
          return fecha >= haceUnMes;
        })
        .slice(0, this.isMobile || this.isDesktop ? 4 : 6);

      this.postresDestacados = recetas
        .filter((r) => r.tipoDePlato === 'Postre' && r.destacada === true)
        .slice(0, 3);

      const idPostresDestacados = new Set(
        this.postresDestacados.map((r) => r.id),
      );

      const postresPool = recetas.filter(
        (r) =>
          r.tipoDePlato === 'Postre' &&
          r.categoria !== 'Mermeladas, limonadas, batidos y licores' &&
          !idPostresDestacados.has(r.id),
      );

      // Selección aleatoria de 4 sin repetición
      const shuffled = [...postresPool].sort(() => Math.random() - 0.5);
      this.postres = shuffled.slice(0, 5);

      this.cargarSugerenciaAleatoria();
      this.cargarRecetaAleatoria();
    });

    this.preparacionesService.getPreparaciones().subscribe((preparaciones) => {
      this.preparaciones = preparaciones;
    });

    this.trucosService.getTrucos().subscribe((trucos) => {
      this.trucos = trucos;
      this.scrollAlFragment();
    });
  }

  private scrollAlFragment(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }

  cargarSugerenciaAleatoria(): void {
    if (this.todasLasRecetas.length > 0) {
      let recetasDestacadas = this.todasLasRecetas.filter(
        (r) => r.destacada === true,
      );
      const indice = Math.floor(Math.random() * recetasDestacadas.length);
      this.sugerenciaAleatoria = recetasDestacadas[indice];
    }
  }

  cargarRecetaAleatoria(): void {
    if (this.todasLasRecetas.length > 0) {
      const indice = Math.floor(Math.random() * this.todasLasRecetas.length);
      this.recetaAleatoria = this.todasLasRecetas[indice];
    }
  }

  abrirModalDeSugerencia(): void {
    if (this.sugerenciaAleatoria) {
      this.dialog.open(ModalComponent, {
        data: this.sugerenciaAleatoria,
        maxWidth: '560px',
        width: '100%',
        panelClass: 'modal-aleatoria',
      });
    }
  }

  abrirModalDeAleatoria(): void {
    if (this.recetaAleatoria) {
      this.dialog.open(ModalComponent, {
        data: this.recetaAleatoria,
        maxWidth: '560px',
        width: '100%',
        panelClass: 'modal-aleatoria',
      });
    }
  }

  verDestacadas(): void {
    this.router.navigate(['/recetas'], {
      queryParams: { destacadas: true, filtros: false, ordenacion: false },
    });
  }

  abrirModalDeInfo(item: Truco | Preparacion): void {
    this.dialog.open(ModalComponent, {
      data: { tipo: 'truco', ...item },
      maxWidth: '820px',
      width: '100%',
      panelClass: 'modal-truco',
    });
  }

  verSalsa(salsa: Salsa): void {
    this.dialog.open(ModalComponent, {
      data: { tipo: 'salsa', ...salsa },
      maxWidth: '820px',
      width: '100%',
      panelClass: 'modal-salsa',
    });
  }

  verPostres(): void {
    this.router.navigate(['/recetas'], {
      queryParams: { tipo: 'Postre', filtros: false, ordenacion: false },
    });
  }

  onImageError(event: any): void {
    event.target.onerror = null;
    event.target.src = 'assets/images/placeholder.webp';
  }
}
