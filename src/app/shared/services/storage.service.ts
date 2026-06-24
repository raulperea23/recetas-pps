import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cloudName = environment.cloudinary.cloudName;
  private uploadPreset = environment.cloudinary.uploadPreset;

  constructor(private http: HttpClient) {}

  async subirImagen(archivo: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', this.uploadPreset);

    const respuesta: any = await firstValueFrom(
      this.http.post(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        formData,
      ),
    );

    return respuesta.secure_url;
  }
}
