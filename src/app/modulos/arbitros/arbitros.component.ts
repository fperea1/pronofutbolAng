import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Arbitro } from './arbitro';
import { Liga } from '../ligas/liga';
import { ArbitrosService } from './arbitros.service';
import { LigasService } from '../ligas/ligas.service';
import { BreadcrumbService } from '../../shared/menu/breadcrumb.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-arbitros',
  templateUrl: './arbitros.component.html',
  styleUrls: ['./arbitros.component.css']
})
export class ArbitrosComponent implements OnInit {

  titulo: String = $localize `Árbitros`;

  arbitro: Arbitro;

  display: boolean = false;

  form: FormGroup;

  registros: Arbitro[];

  cols: any[];

  loading: boolean;

  first: number = 0;

  last: number = 7;

  totalRecords: number = 0;

  listLigas: Liga[];

  filtro: string;

  filtroTablaInicial= '{"first":0,"rows":7,"sortOrder":1,"filters":{},"globalFilter":null}';

  constructor(private fb: FormBuilder, private messageService: MessageService, 
    private arbitrosService: ArbitrosService, private breadcrumbService: BreadcrumbService,
    private ligasService: LigasService) { }

  ngOnInit(): void {

    this.breadcrumbService.cambioBreadcrumb($localize `Árbitros`); 
    
    this.loading = true;

    this.cols = [
      { field: 'nombre', header: $localize `Nombre`, text: true },
      { field: 'ganadosLocal', header: $localize `ganadosLocal`, number: true },
      { field: 'empatados', header: $localize `empatados`, number: true },
      { field: 'ganadosVisitante', header: $localize `ganadosVisitante`, number: true },
      { field: 'liga', header: $localize `Liga`, lista: true },
      { header: '' }
    ];

    this.form = this.fb.group({
      'id': ['', []],
      'nombre': ['', [Validators.required, Validators.maxLength(100)]],
      'ganadosLocal': ['', [Validators.required]],
      'empatados': ['', [Validators.required]],
      'ganadosVisitante': ['', [Validators.required]],
      'liga': ['', [Validators.required]]
    });

    this.ligasService.findForSelect().subscribe({
      next: this.setAllLigas.bind(this)
    });
  }
  
  cargarTabla(res: any) {
    this.registros = res.list;
    this.totalRecords = res.totalRecords;
    this.loading = false;
  }

  exportar() {
    
		const filename = 'report_' + formatDate(Date.now(),'yyyy-MM-dd', 'en-US') + '.xlsx';
    this.arbitrosService.getReportExcel(this.filtro).subscribe(blob => saveAs(blob, filename));
  }

  loadRegistros(event: LazyLoadEvent) {

    this.loading = true;

    this.first=event.first;

    this.last=this.first + event.rows;

    this.filtro = JSON.stringify(event);

    setTimeout(() => {
          this.arbitrosService.findByFilter(this.filtro).subscribe({
              next: this.cargarTabla.bind(this)
          });
    }, 1000);
  }

  checkNumber($event) {
    let regex: RegExp = new RegExp(/^[0-9]{1,}$/g);
    if (regex.test($event.key)) {
      return true;
    } else {
      return false;
    }
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

    this.ligasService.findForSelect().subscribe({
      next: this.setAllLigas.bind(this)
    });
    this.form.reset();
    this.display = true;
  }

  getById(id: number) {
    this.ligasService.findForSelect().subscribe({
      next: this.setAllLigas.bind(this)
    });

    this.arbitrosService.getById(id).subscribe({
      next: this.cargarDto.bind(this)
    });
  }

  setAllLigas(res: any) {
    this.listLigas = res;
  }

  cargarDto(arbitro: Arbitro) {
    this.form.setValue(arbitro);
    this.form.get('liga').setValue(arbitro.liga.id);
    this.display = true;
  }

  update(): void  {
    let liga: Liga = {
      id: this.form.get('liga').value,
      nombre: '',
      pais: null
    };
    this.form.get('liga').setValue(liga);
    this.arbitrosService.update(this.form.value).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  delete(id: number): void  {
    this.arbitrosService.delete(id).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  handleSucces(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: $localize `Resultado`, detail: data});
    this.display = false;
    setTimeout(() => {
          this.arbitrosService.findByFilter(this.filtro).subscribe({
              next: this.cargarTabla.bind(this)
          });
    }, 1000);
  }

}
