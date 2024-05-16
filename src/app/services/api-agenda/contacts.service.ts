import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'http://localhost:3000/api/agenda';

  // Inyectando el servicio HttpClient en el constructor de la clase.
  private http = inject(HttpClient);
  constructor() {}

  // Obtener todos los contactos
  getContacts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear un nuevo contacto
  createContact(contact: any): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }

  // Actualizar un contacto existente
  updateContact(contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, contact);
  }

  // Borrar un contacto
  deleteContact(contact: { deleteId: string }): Observable<any> {
    console.log('Eliminando contacto en el servicio', contact);
    return this.http.delete(`${this.apiUrl}`, {
      body: contact,
    });
  }
}