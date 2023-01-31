import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Usuario } from './usuario';
import { CambioPassword } from '../../shared/interfaces/cambio-password';

@Injectable()
export class UsuariosService {

  constructor(private http: HttpClient) { }

  endpoint: String = 'usuarios';

  endpointRoles: String = 'roles';

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>(this.endpoint + '/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get(this.endpoint + '/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }

  findAllRoles(): Observable <any> {
  
    return this.http.get<any>(this.endpointRoles + '/findForSelect');
  }

  getById(id: number): Observable <Usuario> {
  
    const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Usuario>(this.endpoint + '/getById', params);
  }

  update(usuario: Usuario) {
    if (usuario.id == null) {
      return this.http.post(this.endpoint + '/save', usuario, {responseType: 'text'});
    } else {
      return this.http.put(this.endpoint + '/update', usuario, {responseType: 'text'});
    }
  }

  activar(id: number) {
  
    //const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.put(this.endpoint + '/activate', id, {responseType: 'text'});
  }

  desactivar(id: number) {
  
    //const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.put(this.endpoint + '/deactivate', id, {responseType: 'text'});
  }

  changePassword(pass: CambioPassword) {
    return this.http.put(this.endpoint + '/cambioPasswordAdmin', pass, {responseType: 'text'});
  }

}
