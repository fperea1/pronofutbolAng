import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quiniela } from './quiniela';
import { Liga } from '../ligas/liga';
import { QuinielasService } from './quinielas.service';
import { LigasService } from '../ligas/ligas.service';
import { BreadcrumbService } from '../../shared/menu/breadcrumb.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-quinielas',
  templateUrl: './quinielas.component.html',
  styleUrls: ['./quinielas.component.css']
})
export class QuinielasComponent implements OnInit {

  titulo: String = $localize `Quinielas`;

  quiniela: Quiniela;

  display: boolean = false;

  form: FormGroup;

  registros: Quiniela[];

  cols: any[];

  loading: boolean;

  first: number = 0;

  last: number = 7;

  totalRecords: number = 0;

  listLigas: Liga[];

  filtro: string;

  filtroTablaInicial= '{"first":0,"rows":7,"sortOrder":1,"filters":{},"globalFilter":null}';

  constructor(private fb: FormBuilder, private messageService: MessageService, 
    private quinielasService: QuinielasService, private breadcrumbService: BreadcrumbService,
    private ligasService: LigasService) { }

  ngOnInit(): void {

    this.breadcrumbService.cambioBreadcrumb($localize `Quinielas`); 
    
    this.loading = true;

    this.cols = [
      { field: 'numero', header: $localize `Numero`, number: true  },
      { field: 'nombre', header: $localize `Nombre`, text: true  },
      { field: 'fecha', header: $localize `Fecha`, data: true, format: 'dd/MM/yyyy' },
      { field: 'actualizada', header: $localize `Actualizada`, boolean: true},
      { field: 'liga', header: $localize `Liga`, lista: true },
      { header: '', width: '10%' }
    ];

    this.form = this.fb.group({
      'id': ['', []],
      'numero': ['', [Validators.required, Validators.maxLength(2)]],
      'nombre': ['', [Validators.required, Validators.maxLength(50)]],
      'fecha': ['', [Validators.required]],
      'actualizada': ['', []],
      'liga': ['', [Validators.required]]
    });

    this.ligasService.findAllLigas().subscribe({
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
    this.quinielasService.getReportExcel(this.filtro).subscribe(blob => saveAs(blob, filename));
  }

  loadRegistros(event: LazyLoadEvent) {

    this.loading = true;

    this.first=event.first;

    this.last=this.first + event.rows;

    this.filtro = JSON.stringify(event);

    setTimeout(() => {
          this.quinielasService.findByFilter(this.filtro).subscribe({
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

    this.ligasService.findAllLigas().subscribe({
      next: this.setAllLigas.bind(this)
    });
    this.form.reset();
    this.form.get('actualizada').setValue(false);
    this.display = true;
  }

  getById(id: number) {
    this.ligasService.findAllLigas().subscribe({
      next: this.setAllLigas.bind(this)
    });

    this.quinielasService.getById(id).subscribe({
      next: this.cargarDto.bind(this)
    });
  }

  setAllLigas(res: any) {
    this.listLigas = res;
  }

  cargarDto(quiniela: Quiniela) {
    this.form.setValue(quiniela);
    this.form.get('fecha').setValue(new Date(quiniela.fecha));
    this.form.get('liga').setValue(quiniela.liga.id);
    this.display = true;
  }

  update(): void  {
    let liga: Liga = {
      id: this.form.get('liga').value,
      nombre: '',
      pais: null
    };
    this.form.get('liga').setValue(liga);
    this.quinielasService.update(this.form.value).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  delete(id: number): void  {
    this.quinielasService.delete(id).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  handleSucces(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: $localize `Resultado`, detail: data});
    this.display = false;
    setTimeout(() => {
          this.quinielasService.findByFilter(this.filtro).subscribe({
              next: this.cargarTabla.bind(this)
          });
    }, 1000);
  }

}
