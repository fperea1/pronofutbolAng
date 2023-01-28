import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class LogService {

  constructor(private http: HttpClient) { }

  endpoint: String = 'logs';

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>(this.endpoint + '/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get(this.endpoint + '/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }
}
