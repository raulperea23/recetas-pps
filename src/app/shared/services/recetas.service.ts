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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receta } from '../models/receta.model';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private coleccion = 'recetas';

  constructor(private firestore: Firestore) {}

  getRecetas(): Observable<Receta[]> {
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, orderBy('fechaPublicacion', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Receta[]>;
  }

  getRecetasDestacadas(): Observable<Receta[]> {
    const ref = collection(this.firestore, this.coleccion);
    const q = query(ref, where('destacada', '==', true));
    return collectionData(q, { idField: 'id' }) as Observable<Receta[]>;
  }

  getRecetaPorId(id: string): Observable<Receta> {
    const ref = doc(this.firestore, `recetas/${id}`) as any;
    return docData(ref) as Observable<Receta>;
  }

  getRecetasRelacionadas(
    categoria: string,
    tipoDePlato: string,
    excludeId: string,
  ): Observable<Receta[]> {
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

  addReceta(receta: Receta): Promise<any> {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, receta);
  }

  updateReceta(id: string, receta: Partial<Receta>): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return updateDoc(ref, receta);
  }

  deleteReceta(id: string): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return deleteDoc(ref);
  }
}
