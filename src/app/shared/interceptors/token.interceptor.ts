import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable <HttpEvent<any>> {
      if (this.tokenStorageService.getToken() != null) {
          request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.tokenStorageService.getToken())});
      }
      
      return next.handle(request);
  }
}
