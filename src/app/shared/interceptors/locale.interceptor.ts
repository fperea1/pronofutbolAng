import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocaleStorageService } from '../services/locale-storage.service';

@Injectable()
export class LocaleInterceptor implements HttpInterceptor {

  constructor(private localeStorageService: LocaleStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    request = request.clone({ params: request.params.set('lang', this.localeStorageService.getLang())});
    return next.handle(request);
  }
}
