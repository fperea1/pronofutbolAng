import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Liga } from './liga';

@Injectable()
export class LigasService {

  constructor(private http: HttpClient) { }

  endpoint: String = 'ligas';

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>(this.endpoint + '/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get(this.endpoint + '/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }

  getById(id: number): Observable <Liga> {
  
    const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Liga>(this.endpoint + '/getById', params);
  }

  update(liga: Liga) {
    return this.http.put(this.endpoint + '/update', liga, {responseType: 'text'});
  }

  findForSelect(): Observable <any> {
  
    return this.http.get<any>(this.endpoint + '/findForSelect');
  }

  delete(id: number) {
     return this.http.delete(this.endpoint + '/delete/' + id, {responseType: 'text'});
  }
}
