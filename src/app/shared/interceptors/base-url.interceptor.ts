import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.match(/^http(s)?:\/\/(.*)$/)) {
      const url = `${environment.baseUrl}${request.url}`.replace(/([^:]\/)\/+/g, '$1');
      request = request.clone({ url });
    }
    return next.handle(request);
  }
}
