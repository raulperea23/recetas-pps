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
import { map, Observable } from 'rxjs';

export interface Ingrediente {
  id?: string;
  nombre: string;
  emoji: string;
  categoria: string;
  oculta?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class IngredientesService {
  private coleccion = 'ingredientes';

  constructor(private firestore: Firestore) {}

  getIngredientes(): Observable<Ingrediente[]> {
    return this.getTodosLosIngredientes().pipe(
      map((ingredientes) => ingredientes.filter((i) => i.oculta !== true)),
    );
  }

  /** Incluye los ocultos: solo para el panel de administración. */
  getTodosLosIngredientes(): Observable<Ingrediente[]> {
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('categoria'));
    return collectionData(q, { idField: 'id' }) as Observable<Ingrediente[]>;
  }

  addIngrediente(ingrediente: Ingrediente): Promise<any> {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, ingrediente);
  }

  updateIngrediente(
    id: string,
    ingrediente: Partial<Ingrediente>,
  ): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return updateDoc(ref, ingrediente);
  }

  toggleVisibilidad(id: string, oculta: boolean): Promise<void> {
    return this.updateIngrediente(id, { oculta });
  }
}
