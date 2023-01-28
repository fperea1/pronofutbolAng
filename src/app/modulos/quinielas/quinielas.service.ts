import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Quiniela } from './quiniela';

@Injectable()
export class QuinielasService {

  constructor(private http: HttpClient) { }

  endpoint: String = 'quinielas';

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>(this.endpoint + '/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get(this.endpoint + '/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }

  getById(id: number): Observable <Quiniela> {
  
    const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Quiniela>(this.endpoint + '/getById', params);
  }

  update(quiniela: Quiniela) {
    return this.http.put(this.endpoint + '/update', quiniela, {responseType: 'text'});
  }

  findForSelect(): Observable <any> {
  
    return this.http.get<any>(this.endpoint + '/findForSelect');
  }

  delete(id: number) {
     return this.http.delete(this.endpoint + '/delete/' + id, {responseType: 'text'});
  }

}
