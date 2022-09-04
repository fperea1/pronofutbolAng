import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuracion } from './configuracion';
import { ConfiguracionService } from './configuracion.service';
import { BreadcrumbService } from '../shared/menu/breadcrumb.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  titulo: String = 'Configuración';

  configuracion: Configuracion;

  display: boolean = false;

  configForm: FormGroup;

  registros: Configuracion[];

  cols: any[];

  loading: boolean;

  first: number = 0;

  last: number = 7;

  totalRecords: number = 0;

  filtro: string;

  filtroTablaInicial= '{"first":0,"rows":7,"sortOrder":1,"filters":{},"globalFilter":null}';

  constructor(private fb: FormBuilder, private messageService: MessageService, private configuracionService: ConfiguracionService, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {

    this.breadcrumbService.cambioBreadcrumb('Configuración'); 
    
    this.loading = true;

    this.cols = [
      { field: 'nombre', header: 'Nombre', width: '40%' },
      { field: 'valor', header: 'Valor', width: '40%' },
      { header: '', width: '10%' }
    ];

    this.configForm = this.fb.group({
      'id': ['', []],
      'nombre': ['', []],
      'valor': ['', [Validators.required, Validators.maxLength(500)]],
    });
  }
  
  cargarTabla(res: any) {
    this.registros = res.list;
    this.totalRecords = res.totalRecords;
    this.loading = false;
  }

  exportar() {
    
		const filename = 'report_' + formatDate(Date.now(),'yyyy-MM-dd', 'en-US') + '.xlsx';
    this.configuracionService.getReportExcel(this.filtro).subscribe(blob => saveAs(blob, filename));
  }

  loadRegistros(event: LazyLoadEvent) {

    this.loading = true;

    this.first=event.first;

    this.last=this.first + event.rows;

    this.filtro = JSON.stringify(event);

    setTimeout(() => {
          this.configuracionService.findByFilter(this.filtro).subscribe({
              next: this.cargarTabla.bind(this)
          });
    }, 1000);
  }

  next() {
      this.first = this.first + this.last;
  }

  prev() {
      this.first = this.first - this.last;
  }

  clear(table: Table) {
      table.clear();
  }

  isLastPage(): boolean {
      return this.registros ? this.first === (this.registros.length - this.last): true;
  }

  isFirstPage(): boolean {
      return this.registros ? this.first === 0 : true;
  }

  find(id: number) {
    this.configuracionService.findById(id).subscribe({
      next: this.cargarConfiguracion.bind(this)
    });
  }

  cargarConfiguracion(configuracion: Configuracion) {
    this.configForm.setValue(configuracion);
    this.display = true;
  }

  update(): void  {
      this.configuracionService.update(this.configForm.value).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  handleSucces(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: 'Resultado', detail: data});
    this.display = false;
    setTimeout(() => {
          this.configuracionService.findByFilter(this.filtro).subscribe({
              next: this.cargarTabla.bind(this)
          });
    }, 1000);
  }

}
