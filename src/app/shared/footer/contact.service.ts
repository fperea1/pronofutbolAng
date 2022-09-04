import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Contact } from './contact';
import { CambioPassword } from '../interfaces/cambio-password';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  sendConsulta(contact: Contact) {
  
    return this.http.post('contacto/envioConsulta', contact, {responseType: 'text'});
  
  }
  
  changePassword(pass: CambioPassword) {
    return this.http.put('contacto/cambioPassword', pass, {responseType: 'text'});
  }
}
