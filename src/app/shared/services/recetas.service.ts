import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Receta } from '../models/receta.model';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private coleccion = 'recetas';
  private cache: Receta[] | null = null;
  private cacheDestacadas: Receta[] | null = null;

  constructor(private firestore: Firestore) {}

  getRecetas(): Observable<Receta[]> {
    if (this.cache) {
      return of(this.cache);
    }
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('fechaPublicacion', 'desc'));
    return (collectionData(q, { idField: 'id' }) as Observable<Receta[]>).pipe(
      tap((recetas) => (this.cache = recetas)),
    );
  }

  getRecetasDestacadas(): Observable<Receta[]> {
    if (this.cacheDestacadas) {
      return of(this.cacheDestacadas);
    }
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, where('destacada', '==', true));
    return (collectionData(q, { idField: 'id' }) as Observable<Receta[]>).pipe(
      tap((recetas) => (this.cacheDestacadas = recetas)),
    );
  }

  getRecetaPorId(id: string): Observable<Receta> {
    // Si tenemos caché, buscamos primero ahí
    if (this.cache) {
      const receta = this.cache.find((r) => r.id === id);
      if (receta) return of(receta);
    }
    const ref = doc(this.firestore, `recetas/${id}`) as any;
    return docData(ref) as Observable<Receta>;
  }

  getRecetasRelacionadas(
    categoria: string,
    tipoDePlato: string,
    excludeId: string,
  ): Observable<Receta[]> {
    // Si tenemos caché, filtramos desde ella
    if (this.cache) {
      const relacionadas = this.cache.filter(
        (r) =>
          r.categoria === categoria &&
          r.tipoDePlato === tipoDePlato &&
          r.id !== excludeId,
      );
      return of(relacionadas);
    }
    const ref = collection(this.firestore, this.coleccion);
    const q = query(
      ref,
      where('categoria', '==', categoria),
      where('tipoDePlato', '==', tipoDePlato),
    );
    return collectionData(q, { idField: 'id' }).pipe(
      map((recetas: any[]) => recetas.filter((r) => r.id !== excludeId)),
    ) as Observable<Receta[]>;
  }

  invalidarCache(): void {
    this.cache = null;
    this.cacheDestacadas = null;
  }

  addReceta(receta: Receta): Promise<any> {
    this.invalidarCache();
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, receta);
  }

  updateReceta(id: string, receta: Partial<Receta>): Promise<void> {
    this.invalidarCache();
    const ref = doc(this.firestore, this.coleccion, id);
    return updateDoc(ref, receta);
  }

  deleteReceta(id: string): Promise<void> {
    this.invalidarCache();
    const ref = doc(this.firestore, this.coleccion, id);
    return deleteDoc(ref);
  }
}
