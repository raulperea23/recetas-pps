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
import { Observable } from 'rxjs';

export interface Ingrediente {
  id?: string;
  nombre: string;
  emoji: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root',
})
export class IngredientesService {
  private coleccion = 'ingredientes';

  constructor(private firestore: Firestore) {}

  getIngredientes(): Observable<Ingrediente[]> {
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

  deleteIngrediente(id: string): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return deleteDoc(ref);
  }
}
