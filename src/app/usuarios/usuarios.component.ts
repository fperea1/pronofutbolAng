import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './usuario';
import { Rol } from './rol';
import { UsuariosService } from './usuarios.service';
import { BreadcrumbService } from '../shared/menu/breadcrumb.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  titulo: String = 'Usuarios';

  usuario: Usuario;

  display: boolean = false;

  userForm: FormGroup;

  registros: Usuario[];

  listRoles: Rol[];

  cols: any[];

  loading: boolean;

  first: number;

  last: number;

  totalRecords: number;

  filtro: string;

  filtroTablaInicial= '{"first":0,"rows":10,"sortOrder":1,"filters":{},"globalFilter":null}';

  constructor(private fb: FormBuilder, private messageService: MessageService, private usuariosService: UsuariosService, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {

    this.breadcrumbService.cambioBreadcrumb('Usuarios'); 
    
    this.loading = true;

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'fechaAlta', header: 'Fecha de Alta', data: true, format: 'dd/MM/yyyy HH:mm:ss'  },
      { field: 'fechaDesactivacion', header: 'Fecha de Baja', data: true, format: 'dd/MM/yyyy HH:mm:ss'  },
      { field: 'activo', header: 'Activo' },
      { field: 'roles', header: 'Roles' },
      { header: '', width: '10%' }
    ];

    this.userForm = this.fb.group({
      'id': ['', []],
      'nombre': ['', [Validators.required]],
      'username': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'fechaAlta': ['', []],
      'fechaDesactivacion': ['', []],
      'activo': ['', []],
      'roles': ['', []]
    });

  }

  cargarTabla(res: any) {
    this.registros = res.list;
    this.totalRecords = res.totalRecords;
    this.loading = false;
  }

  exportar() {
    
		const filename = 'report_' + formatDate(Date.now(),'yyyy-MM-dd', 'en-US') + '.xlsx';
    this.usuariosService.getReportExcel(this.filtro).subscribe(blob => saveAs(blob, filename));
  }

  loadRegistros(event: LazyLoadEvent) {

    this.loading = true;

    this.first=event.first;

    this.last=this.first + event.rows;

    this.filtro = JSON.stringify(event);

    setTimeout(() => {
          this.usuariosService.findByFilter(this.filtro).subscribe({
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
    
    this.usuariosService.findByAllRoles().subscribe({
      next: this.setAllRoles.bind(this)
    });

    this.usuariosService.findById(id).subscribe({
      next: this.setUser.bind(this)
    });
  }

  setAllRoles(res: any) {
    this.listRoles = res.list;
  }

  setUser(usuario: Usuario) {
    let ids: number[] = [];
    for (let r of usuario.roles){
      ids.push(r.id);
    } 
    this.userForm.setValue(usuario);
    this.userForm.get('roles').setValue(ids);
    this.display = true;
  }

  update(): void  {
      let roles: Rol[] = []
      for (let r of this.userForm.get('roles').value){
        let rol: Rol = {
          id: r,
          nombre: ''
        };
        roles.push(rol);
      } 
      this.userForm.get('roles').setValue(roles);
      this.usuariosService.update(this.userForm.value).subscribe({
        next: this.handleSucces.bind(this)
      }); 
  }

  handleSucces(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: 'Resultado', detail: data});
    this.display = false;
    setTimeout(() => {
          this.usuariosService.findByFilter(this.filtro).subscribe({
              next: this.cargarTabla.bind(this)
          });
    }, 1000);
  }

}
