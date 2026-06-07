import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Truco {
  id?: string;
  nombre: string;
  descripcion: string;
  icono: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrucosService {
  private coleccion = 'trucos';

  constructor(private firestore: Firestore) {}

  getTrucos(): Observable<Truco[]> {
    const ref = collection(this.firestore, this.coleccion);
    return collectionData(ref, { idField: 'id' }) as Observable<Truco[]>;
  }

  addTruco(truco: Truco): Promise<any> {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, truco);
  }

  updateTruco(id: string, truco: Partial<Truco>): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return updateDoc(ref, truco);
  }

  deleteTruco(id: string): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return deleteDoc(ref);
  }
}
