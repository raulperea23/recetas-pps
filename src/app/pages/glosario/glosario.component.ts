import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { glosario } from './glosario.config';

interface TerminoGlosario {
  termino: string;
  definicion: string;
}

interface LetraGlosario {
  letra: string;
  terminos: TerminoGlosario[];
}

@Component({
  selector: 'app-glosario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './glosario.component.html',
  styleUrl: './glosario.component.css',
})
export class GlosarioComponent implements OnInit {
  letras: LetraGlosario[] = [];
  letrasVisibles: LetraGlosario[] = [];
  abecedario: string[] = [];
  busqueda: string = '';

  constructor(private title: Title) {
    this.title.setTitle('Glosario | Platos Para Siempre');
  }

  ngOnInit(): void {
    this.parsearGlosario();
    this.letrasVisibles = this.letras;
    this.abecedario = this.letras.map((l) => l.letra);
  }

  parsearGlosario(): void {
    const lineas = glosario.split('\n').filter((l) => l.trim() !== '');
    let letraActual: LetraGlosario | null = null;

    for (const linea of lineas) {
      if (linea.trim().length === 1 && linea.trim().match(/[A-Z]/)) {
        if (letraActual) this.letras.push(letraActual);
        letraActual = { letra: linea.trim(), terminos: [] };
      } else if (letraActual && linea.includes(':')) {
        const separador = linea.indexOf(':');
        const termino = linea.substring(0, separador).trim();
        const definicion = linea.substring(separador + 1).trim();
        letraActual.terminos.push({ termino, definicion });
      }
    }

    if (letraActual) this.letras.push(letraActual);
  }

  filtrar(): void {
    if (!this.busqueda.trim()) {
      this.letrasVisibles = this.letras;
      return;
    }

    const busq = this.busqueda.toLowerCase();
    this.letrasVisibles = this.letras
      .map((l) => ({
        letra: l.letra,
        terminos: l.terminos.filter(
          (t) =>
            t.termino.toLowerCase().includes(busq) ||
            t.definicion.toLowerCase().includes(busq),
        ),
      }))
      .filter((l) => l.terminos.length > 0);
  }

  scrollALetra(letra: string): void {
    const el = document.getElementById('letra-' + letra);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
