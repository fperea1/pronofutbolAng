import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Liga } from './liga';

@Injectable()
export class LigasService {

  constructor(private http: HttpClient) { }

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>('ligas/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get('ligas/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }

  getById(id: number): Observable <Liga> {
  
    const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Liga>('ligas/getById', params);
  }

  update(liga: Liga) {
    return this.http.put('ligas/update', liga, {responseType: 'text'});
  }

  findAllLigas(): Observable <any> {
  
    return this.http.get<any>('ligas/findForSelect');
  }
}
