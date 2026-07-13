import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Preparacion {
  id?: string;
  nombre: string;
  descripcion: string;
  icono: string;
  orden?: number;
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
    ).pipe(tap((preparaciones) => (this.cache = preparaciones)));
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

  deletePreparacion(id: string): Promise<void> {
    this.invalidarCache();
    const ref = doc(this.firestore, this.coleccion, id);
    return deleteDoc(ref);
  }
}
