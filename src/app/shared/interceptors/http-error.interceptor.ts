import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof ErrorEvent) {
          // client-side error
          this.messageService.add({key: 'errorMensaje', severity:'error', summary: $localize `Error`, detail: $localize `Se ha producido un error. Contacte con el administrador`, sticky: true});
        } else {
          if (err.error === null || err.status === 500 || err.status === 0) {
            this.messageService.add({key: 'errorMensaje', severity:'error', summary: $localize `Error`, detail: $localize `Se ha producido un error. Contacte con el administrador`, sticky: true});
          } else {
            let e = (err.error).toString();
            if (e.includes(",")) {
              e = JSON.parse(err.error).toString().replaceAll(",", "<br/>") 
            }
            this.messageService.add({key: 'errorMensaje', severity:'error', summary: $localize `Error`, detail: e, sticky: true});
          }
        }
        return throwError(() => err);
      })
    );
  }
}
