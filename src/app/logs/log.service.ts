import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Log } from './log';

@Injectable()
export class LogService {

  constructor(private http: HttpClient) { }

  findAll(): Observable <Log[]> {
  
    return this.http.get<Log[]>('logs/findAll');
  }
}
