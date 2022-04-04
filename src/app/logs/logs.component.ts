import { Component, OnInit } from '@angular/core';
import { Log } from './log';
import { LogService } from './log.service';
import { BreadcrumbService } from '../shared/menu/breadcrumb.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];

  cols: any[];

  constructor(private logService: LogService, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {

    this.breadcrumbService.cambioBreadcrumb('Logs'); 
    
    this.logService.findAll().subscribe({
      next: this.cargarTabla.bind(this)
    });

    this.cols = [
      { field: 'username', header: 'Usuario', width: '10%' },
      { field: 'entidad', header: 'Entidad', width: '15%' },
      { field: 'accion', header: 'accion', width: '25%' },
      { field: 'observaciones', header: 'Observaciones', width: '25%' },
      { field: 'fecha', header: 'Fecha', width: '10%', data: true, format: 'dd/MM/yyyy HH:mm:ss' }
    ];
  }

  cargarTabla(logs: Log[]) {
    this.logs = logs;
  }

  exportar() {
    alert('oo');
  }

}
