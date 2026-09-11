import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Preparacion {
  id?: string;
  nombre: string;
  descripcion: string;
  icono: string;
  orden?: number;
  oculta?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PreparacionesService {
  private coleccion = 'preparaciones';
  private cache: Preparacion[] | null = null;

  constructor(private firestore: Firestore) {}

  getPreparaciones(): Observable<Preparacion[]> {
    if (this.cache) {
      return of(this.cache);
    }
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('orden', 'asc'));
    return (
      collectionData(q, { idField: 'id' }) as Observable<Preparacion[]>
    ).pipe(
      map((preparaciones) => preparaciones.filter((p) => p.oculta !== true)),
      tap((preparaciones) => (this.cache = preparaciones)),
    );
  }

  /** Incluye las ocultas: solo para el panel de administración. */
  getTodasLasPreparaciones(): Observable<Preparacion[]> {
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('orden', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Preparacion[]>;
  }

  invalidarCache(): void {
    this.cache = null;
  }

  addPreparacion(preparacion: Preparacion): Promise<any> {
    this.invalidarCache();
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, preparacion);
  }

  updatePreparacion(
    id: string,
    preparacion: Partial<Preparacion>,
  ): Promise<void> {
    this.invalidarCache();
    const ref = doc(this.firestore, this.coleccion, id);
    return updateDoc(ref, preparacion);
  }

  toggleVisibilidad(id: string, oculta: boolean): Promise<void> {
    return this.updatePreparacion(id, { oculta });
  }
}
