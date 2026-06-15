import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario$: Observable<any>;

  constructor(private auth: Auth) {
    this.usuario$ = user(this.auth);
    setPersistence(this.auth, browserLocalPersistence).catch((err) => {
      console.error('Error al establecer persistencia:', err);
    });
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
