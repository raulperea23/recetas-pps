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

export interface Truco {
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
export class TrucosService {
  private coleccion = 'trucos';
  private cache: Truco[] | null = null;

  constructor(private firestore: Firestore) {}

  getTrucos(): Observable<Truco[]> {
    if (this.cache) {
      return of(this.cache);
    }
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('orden', 'asc'));
    return (collectionData(q, { idField: 'id' }) as Observable<Truco[]>).pipe(
      map((trucos) => trucos.filter((t) => t.oculta !== true)),
      tap((trucos) => (this.cache = trucos)),
    );
  }

  /** Incluye los ocultos: solo para el panel de administración. */
  getTodosLosTrucos(): Observable<Truco[]> {
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('orden', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Truco[]>;
  }

  invalidarCache(): void {
    this.cache = null;
  }

  addTruco(truco: Truco): Promise<any> {
    this.invalidarCache();
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, truco);
  }

  updateTruco(id: string, truco: Partial<Truco>): Promise<void> {
    this.invalidarCache();
    const ref = doc(this.firestore, this.coleccion, id);
    return updateDoc(ref, truco);
  }

  toggleVisibilidad(id: string, oculta: boolean): Promise<void> {
    return this.updateTruco(id, { oculta });
  }
}
