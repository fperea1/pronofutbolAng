import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Liga } from './liga';
import { LigasService } from './ligas.service';
import { Pais } from '../paises/pais';
import { PaisesService } from '../paises/paises.service';
import { BreadcrumbService } from '../../shared/menu/breadcrumb.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.css']
})
export class LigasComponent implements OnInit {

  titulo: String = $localize `Ligas`;

  liga: Liga;

  display: boolean = false;

  form: FormGroup;

  registros: Liga[];

  cols: any[];

  loading: boolean;

  first: number = 0;

  last: number = 7;

  totalRecords: number = 0;

  listPaises: Pais[];

  filtro: string;

  filtroTablaInicial= '{"first":0,"rows":7,"sortOrder":1,"filters":{},"globalFilter":null}';

  constructor(private fb: FormBuilder, private messageService: MessageService, 
    private ligasService: LigasService, private breadcrumbService: BreadcrumbService,
    private paisesService: PaisesService) { }

  ngOnInit(): void {

    this.breadcrumbService.cambioBreadcrumb($localize `Ligas`); 
    
    this.loading = true;

    this.cols = [
      { field: 'nombre', header: $localize `Nombre`, text: true  },
      { field: 'pais', header: $localize `Pais`, lista: true },
      { header: '', width: '10%' }
    ];

    this.form = this.fb.group({
      'id': ['', []],
      'nombre': ['', [Validators.required, Validators.maxLength(50)]],
      'pais': ['', [Validators.required]]
    });

    this.paisesService.findForSelect().subscribe({
      next: this.setAllPaises.bind(this)
    });
  }
  
  cargarTabla(res: any) {
    this.registros = res.list;
    this.totalRecords = res.totalRecords;
    this.loading = false;
  }

  exportar() {
    
		const filename = 'report_' + formatDate(Date.now(),'yyyy-MM-dd', 'en-US') + '.xlsx';
    this.ligasService.getReportExcel(this.filtro).subscribe(blob => saveAs(blob, filename));
  }

  loadRegistros(event: LazyLoadEvent) {

    this.loading = true;

    this.first=event.first;

    this.last=this.first + event.rows;

    this.filtro = JSON.stringify(event);

    setTimeout(() => {
          this.ligasService.findByFilter(this.filtro).subscribe({
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

    this.paisesService.findForSelect().subscribe({
      next: this.setAllPaises.bind(this)
    });
    this.form.reset();
    this.display = true;
  }

  getById(id: number) {
    this.paisesService.findForSelect().subscribe({
      next: this.setAllPaises.bind(this)
    });

    this.ligasService.getById(id).subscribe({
      next: this.cargarDto.bind(this)
    });
  }

  setAllPaises(res: any) {
    this.listPaises = res;
  }

  cargarDto(liga: Liga) {
    this.form.setValue(liga);
    this.form.get('pais').setValue(liga.pais.id);
    this.display = true;
  }

  update(): void  {
    let pais: Pais = {
      id: this.form.get('pais').value,
      nombre: ''
    };
    this.form.get('pais').setValue(pais);
    this.ligasService.update(this.form.value).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  delete(id: number): void  {
    this.ligasService.delete(id).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  handleSucces(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: $localize `Resultado`, detail: data});
    this.display = false;
    setTimeout(() => {
          this.ligasService.findByFilter(this.filtro).subscribe({
              next: this.cargarTabla.bind(this)
          });
    }, 1000);
  }

}
