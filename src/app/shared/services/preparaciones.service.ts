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

  constructor(private firestore: Firestore) {}

  getPreparaciones(): Observable<Preparacion[]> {
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('orden', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Preparacion[]>;
  }

  addPreparacion(preparacion: Preparacion): Promise<any> {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, preparacion);
  }

  updatePreparacion(
    id: string,
    preparacion: Partial<Preparacion>,
  ): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return updateDoc(ref, preparacion);
  }

  deletePreparacion(id: string): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return deleteDoc(ref);
  }
}
