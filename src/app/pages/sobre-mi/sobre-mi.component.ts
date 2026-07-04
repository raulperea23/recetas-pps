import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { RecetasService } from '../../shared/services/recetas.service';
import { PreparacionesService } from '../../shared/services/preparaciones.service';
import { TrucosService } from '../../shared/services/trucos.service';
import { CATEGORIAS } from '../../shared/models/app.types';
import { SALSAS } from '../home/home.salsas';

interface Numero {
  valor: number;
  etiqueta: string;
  icono: string;
  animado: number;
}

interface ValorCocina {
  icono: string;
  frase: string;
}

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query(
          '.valor-card',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(
              150,
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class SobreMiComponent implements OnInit, OnDestroy {
  typewriterText: string = '';
  typewriterDone: boolean = false;
  private typewriterInterval: any;
  private fullText: string =
    'Me llamo Pilar Paraíso y quiero darte la bienvenida a mi mundo de sabores...';

  scrolled: boolean = false;
  historiaVisible: boolean = false;
  valoresVisible: boolean = false;
  numerosVisible: boolean = false;

  categorias = CATEGORIAS;

  valoresCocina: ValorCocina[] = [
    {
      icono: '❤️',
      frase: 'Todas las recetas están escritas y cocinadas con mucho amor',
    },
    { icono: '🌿', frase: 'Porque lo que más nos gusta en mi casa es comer' },
    { icono: '👨‍👩‍👧‍👦', frase: 'Para la gente que más quiero' },
    {
      icono: '✨',
      frase: 'Porque estas recetas tienes un valor especial para mi',
    },
  ];

  numeros: Numero[] = [
    { valor: 0, etiqueta: 'Años cocinando', icono: '👩‍🍳', animado: 0 },
    { valor: 0, etiqueta: 'Recetas publicadas', icono: '📖', animado: 0 },
    { valor: 0, etiqueta: 'Preparaciones', icono: '🍳', animado: 0 },
    { valor: 0, etiqueta: 'Trucos', icono: '💡', animado: 0 },
    { valor: 0, etiqueta: 'Salsas', icono: '🫙', animado: 0 },
  ];

  recetasPorCategoria: { categoria: string; total: number }[] = [];

  constructor(
    private title: Title,
    private recetasService: RecetasService,
    private preparacionesService: PreparacionesService,
    private trucosService: TrucosService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Sobre mí | Paraíso Para Saborear');
    this.iniciarTypewriter();
    this.cargarNumeros();
    this.observarSecciones();
  }

  ngOnDestroy(): void {
    if (this.typewriterInterval) clearInterval(this.typewriterInterval);
  }

  iniciarTypewriter(): void {
    let i = 0;
    this.typewriterInterval = setInterval(() => {
      if (i < this.fullText.length) {
        this.typewriterText += this.fullText.charAt(i);
        i++;
      } else {
        this.typewriterDone = true;
        clearInterval(this.typewriterInterval);
      }
    }, 80);
  }

  cargarNumeros(): void {
    const yearNacimiento = 1963;
    const yearActual = new Date().getFullYear();
    this.numeros[0].valor = yearActual - yearNacimiento;

    this.recetasService.getRecetas().subscribe((recetas) => {
      this.numeros[1].valor = recetas.length;

      this.recetasPorCategoria = CATEGORIAS.map((cat) => ({
        categoria: cat,
        total: recetas.filter((r) => r.categoria === cat).length,
      })).filter((c) => c.total > 0);

      this.animarNumeros();
    });

    this.preparacionesService.getPreparaciones().subscribe((preps) => {
      this.numeros[2].valor = preps.length;
      this.animarNumeros();
    });

    this.trucosService.getTrucos().subscribe((trucos) => {
      this.numeros[3].valor = trucos.length;
      this.animarNumeros();
    });

    this.numeros[4].valor = SALSAS.length;
  }

  animarNumeros(): void {
    this.numeros.forEach((num, index) => {
      let start = 0;
      const end = num.valor;
      const duration = 1500;
      const step = Math.ceil(end / (duration / 30));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          this.numeros[index].animado = end;
          clearInterval(interval);
        } else {
          this.numeros[index].animado = start;
        }
      }, 30);
    });
  }

  scrollAContenido(): void {
    const el = document.getElementById('historia');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  observarSecciones(): void {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (entry.target.id === 'historia') this.historiaVisible = true;
              if (entry.target.id === 'valores') this.valoresVisible = true;
              if (entry.target.id === 'numeros') {
                this.numerosVisible = true;
                this.animarNumeros();
              }
            }
          });
        },
        { threshold: 0.2 },
      );

      ['historia', 'valores', 'numeros'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);
  }
}
