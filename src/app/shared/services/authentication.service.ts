import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Authentication } from '../../modulos/authentication/authentication'; 
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  attemptAuthentication(authentication: Authentication): Observable <any> {
  
    return this.http.post('autenticacion/generate-token', authentication, {responseType: 'text'});
  }

  logout(): Observable <any> {
  
    return this.http.get('autenticacion/logout', {responseType: 'text'});
  }

}

