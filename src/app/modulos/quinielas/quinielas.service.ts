import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Quiniela } from './quiniela';

@Injectable()
export class QuinielasService {

  constructor(private http: HttpClient) { }

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>('quinielas/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get('quinielas/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }

  getById(id: number): Observable <Quiniela> {
  
    const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Quiniela>('quinielas/getById', params);
  }

  update(quiniela: Quiniela) {
    return this.http.put('quinielas/update', quiniela, {responseType: 'text'});
  }

  delete(id: number) {
     return this.http.delete('quinielas/delete/' + id, {responseType: 'text'});
  }

}
