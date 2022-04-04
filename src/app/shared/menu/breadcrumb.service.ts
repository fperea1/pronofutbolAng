import { Injectable, EventEmitter, Output   } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  @Output() change: EventEmitter<string> = new EventEmitter();

  constructor() { }

  cambioBreadcrumb(funcionalidad: string) {
    this.change.emit(funcionalidad);
  }
}
