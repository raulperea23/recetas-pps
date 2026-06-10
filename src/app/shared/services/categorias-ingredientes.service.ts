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

export interface CategoriaIngrediente {
  id?: string;
  nombre: string;
  orden: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriasIngredientesService {
  private coleccion = 'categorias-ingredientes';

  constructor(private firestore: Firestore) {}

  getCategorias(): Observable<CategoriaIngrediente[]> {
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('orden'));
    return collectionData(q, { idField: 'id' }) as Observable<
      CategoriaIngrediente[]
    >;
  }

  addCategoria(categoria: CategoriaIngrediente): Promise<any> {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, categoria);
  }

  updateCategoria(
    id: string,
    categoria: Partial<CategoriaIngrediente>,
  ): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return updateDoc(ref, categoria);
  }

  deleteCategoria(id: string): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return deleteDoc(ref);
  }
}
