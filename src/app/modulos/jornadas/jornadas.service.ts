import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Jornada } from './jornada';

@Injectable()
export class JornadasService {

  constructor(private http: HttpClient) { }

  endpoint: String = 'jornadas';

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>(this.endpoint + '/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get(this.endpoint + '/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }

  getById(id: number): Observable <Jornada> {
  
    const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Jornada>(this.endpoint + '/getById', params);
  }

  update(jornada: Jornada) {
    return this.http.put(this.endpoint + '/update', jornada, {responseType: 'text'});
  }

  findForSelect(): Observable <any> {
  
    return this.http.get<any>(this.endpoint + '/findForSelect');
  }

  delete(id: number) {
     return this.http.delete(this.endpoint + '/delete/' + id, {responseType: 'text'});
  }
}
