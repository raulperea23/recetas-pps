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

export interface CategoriaIngrediente {
  id?: string;
  nombre: string;
  orden: number;
  oculta?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriasIngredientesService {
  private coleccion = 'categorias-ingredientes';

  constructor(private firestore: Firestore) {}

  getCategorias(): Observable<CategoriaIngrediente[]> {
    return this.getTodasLasCategorias().pipe(
      map((categorias) => categorias.filter((c) => c.oculta !== true)),
    );
  }

  /** Incluye las ocultas: solo para el panel de administración. */
  getTodasLasCategorias(): Observable<CategoriaIngrediente[]> {
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

  toggleVisibilidad(id: string, oculta: boolean): Promise<void> {
    return this.updateCategoria(id, { oculta });
  }
}
