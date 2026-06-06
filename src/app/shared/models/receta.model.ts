import { Categoria, Dificultad, UnidadTiempo } from './app.types';

export interface Receta {
  id?: string;
  nombre: string;
  origen: string;
  categoria: Categoria;
  foto: string;
  ingredientes: string[];
  elaboracion: string;
  comensales: number;
  dificultad: Dificultad;
  tiempoPreparacion: number;
  tiempoUnidad: UnidadTiempo;
  destacada: boolean;
  fechaPublicacion: Date;
}
