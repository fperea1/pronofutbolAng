import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jornada } from './jornada';
import { JornadasService } from './jornadas.service';
import { BreadcrumbService } from '../../shared/menu/breadcrumb.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {

  titulo: String = $localize `Jornadas`;

  jornada: Jornada;

  display: boolean = false;

  form: FormGroup;

  registros: Jornada[];

  cols: any[];

  loading: boolean;

  first: number = 0;

  last: number = 7;

  totalRecords: number = 0;

  listJornadas: Jornada[];

  filtro: string;

  filtroTablaInicial= '{"first":0,"rows":7,"sortOrder":1,"filters":{},"globalFilter":null}';

  constructor(private fb: FormBuilder, private messageService: MessageService, 
    private jornadasService: JornadasService, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {

    this.breadcrumbService.cambioBreadcrumb($localize `Jornadas`); 
    
    this.loading = true;

    this.cols = [
      { field: 'nombre', header: $localize `Nombre`, text: true  },
      { header: '', width: '10%' }
    ];

    this.form = this.fb.group({
      'id': ['', []],
      'nombre': ['', [Validators.required, Validators.maxLength(50)]]
    });
  }
  
  cargarTabla(res: any) {
    this.registros = res.list;
    this.totalRecords = res.totalRecords;
    this.loading = false;
  }

  exportar() {
    
		const filename = 'report_' + formatDate(Date.now(),'yyyy-MM-dd', 'en-US') + '.xlsx';
    this.jornadasService.getReportExcel(this.filtro).subscribe(blob => saveAs(blob, filename));
  }

  loadRegistros(event: LazyLoadEvent) {

    this.loading = true;

    this.first=event.first;

    this.last=this.first + event.rows;

    this.filtro = JSON.stringify(event);

    setTimeout(() => {
          this.jornadasService.findByFilter(this.filtro).subscribe({
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

  openNew() {
    this.form.reset();
    this.display = true;
  }

  getById(id: number) {

    this.jornadasService.getById(id).subscribe({
      next: this.cargarDto.bind(this)
    });
  }

  cargarDto(jornada: Jornada) {
    this.form.setValue(jornada);
    this.display = true;
  }

  update(): void  {
    this.jornadasService.update(this.form.value).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  delete(id: number): void  {
    this.jornadasService.delete(id).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  handleSucces(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: $localize `Resultado`, detail: data});
    this.display = false;
    setTimeout(() => {
          this.jornadasService.findByFilter(this.filtro).subscribe({
              next: this.cargarTabla.bind(this)
          });
    }, 1000);
  }

}