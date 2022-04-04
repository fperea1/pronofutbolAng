import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Authentication } from '../../authentication/authentication'; 

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  attemptAuthentication(authentication: Authentication): Observable <any> {
  
    return this.http.post('autenticacion/generate-token', authentication, {responseType: 'text'});
  }

  logout(): void {
  
    this.http.get('logout');
  }

}

