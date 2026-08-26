import { Categoria, Dificultad, TipoDePlato, UnidadTiempo } from './app.types';

export interface FotoReceta {
  url: string;
  orden: number;
}

export interface Receta {
  id?: string;
  nombre: string;
  origen: string;
  categoria: Categoria;
  tipoDePlato: TipoDePlato;
  foto: string;
  fotos?: FotoReceta[];
  ingredientes: string[];
  elaboracion: string;
  comensales: number;
  dificultad: Dificultad;
  tiempoPreparacion: number;
  tiempoUnidad: UnidadTiempo;
  destacada: boolean;
  fechaPublicacion: Date;
  visitas?: number;
}
