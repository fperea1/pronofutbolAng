import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable()
export class UsuariosService {

  constructor(private http: HttpClient) { }

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>('usuarios/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get('usuarios/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }

  findById(id: number): Observable <Usuario> {
  
    const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Usuario>('usuarios/find', params);
  }

  update(usuario: Usuario) {
    return this.http.put('usuarios/update', usuario, {responseType: 'text'});
  }
}
