import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Log } from './log';
import { Filter } from '../shared/filters/filter';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class LogService {

  constructor(private http: HttpClient) { }

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>('logs/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get('logs/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }
}
