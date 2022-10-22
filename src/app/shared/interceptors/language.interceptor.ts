import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageStorageService } from '../services/language-storage.service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor(private languageStorageService: LanguageStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({ params: request.params.set('lang', this.languageStorageService.getLang())});
   // request.headers.delete('Accept-Language');
   // request = request.clone({ headers: request.headers.set('Accept-Language', this.languageStorageService.getLang().split('_')[0])});
    
    return next.handle(request);
  }
}
