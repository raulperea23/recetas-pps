import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  query,
  orderBy,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface CambioHistorial {
  campo: string;
  valorAntiguo: any;
  valorNuevo: any;
}

export interface EntradaHistorial {
  id?: string;
  recetaId: string;
  recetaNombre: string;
  fecha: Date;
  cambios: CambioHistorial[];
}

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private coleccion = 'historial';

  constructor(private firestore: Firestore) {}

  getHistorial(): Observable<EntradaHistorial[]> {
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('fecha', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<
      EntradaHistorial[]
    >;
  }

  guardarEntrada(entrada: Omit<EntradaHistorial, 'id'>): Promise<any> {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, entrada);
  }

  eliminarEntrada(id: string): Promise<void> {
    const ref = collection(this.firestore, this.coleccion);
    const docRef = doc(ref, id);
    return deleteDoc(docRef);
  }
}
