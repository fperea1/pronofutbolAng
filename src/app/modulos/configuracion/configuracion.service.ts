import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Configuracion } from './configuracion';

@Injectable()
export class ConfiguracionService {

  constructor(private http: HttpClient) { }

  endpoint: String = 'configuracion';

  findByFilter(filtro: string): Observable <any> {
  
    const params = filtro ? { params: new HttpParams().set('filtro', filtro) } : {};
    return this.http.get<any>(this.endpoint + '/findByFilter', params);
  }

  getReportExcel(filtro: string): Observable <Blob> {
  
    return this.http.get(this.endpoint + '/getReportExcel?filtro='+encodeURI(filtro), {responseType: 'blob'});
    
  }

  getById(id: number): Observable <Configuracion> {
  
    const params = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Configuracion>(this.endpoint + '/getById', params);
  }

  update(configuracion: Configuracion) {
    return this.http.put(this.endpoint + '/update', configuracion, {responseType: 'text'});
  }

}
