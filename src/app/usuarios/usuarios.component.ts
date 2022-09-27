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

  displayPassword: boolean = false;

  userForm: FormGroup;

  passwordForm: FormGroup;

  registros: Usuario[];

  listRoles: Rol[];

  cols: any[];

  loading: boolean;

  first: number = 0;

  last: number = 7;

  totalRecords: number = 0;

  filtro: string;

  filtroTablaInicial= '{"first":0,"rows":7,"sortOrder":1,"filters":{},"globalFilter":null}';

  constructor(private fb: FormBuilder, private messageService: MessageService, private usuariosService: UsuariosService, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {

    this.breadcrumbService.cambioBreadcrumb('Usuarios'); 
    
    this.loading = true;

    this.cols = [
      { field: 'nombre', header: 'Nombre', text: true },
      { field: 'username', header: 'Username', text: true },
      { field: 'email', header: 'Email', text: true },
      { field: 'fechaAlta', header: 'Fecha de Alta', data: true, format: 'dd/MM/yyyy HH:mm:ss'  },
      { field: 'fechaDesactivacion', header: 'Fecha de Baja', data: true, format: 'dd/MM/yyyy HH:mm:ss'  },
      { field: 'activo', header: 'Activo',  boolean: true},
      { field: 'roles', header: 'Roles', lista: true },
      { header: '', width: '10%' }
    ];

    this.userForm = this.fb.group({
      'id': ['', []],
      'nombre': ['', [Validators.required]],
      'username': ['', [Validators.required]],
      'password': ['', []],
      'email': ['', [Validators.required]],
      'fechaAlta': ['', []],
      'fechaDesactivacion': ['', []],
      'activo': ['', []],
      'roles': ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      'id':'',
      'newPassword': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      'newPassword2': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    });

    this.usuariosService.findAllRoles().subscribe({
      next: this.setAllRoles.bind(this)
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

  openNew() {

    this.usuariosService.findAllRoles().subscribe({
      next: this.setAllRoles.bind(this)
    });
    this.userForm.reset();
    this.userForm.get('activo').setValue(true);
    this.display = true;
  }

  find(id: number) {
    
    this.usuariosService.findAllRoles().subscribe({
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
    usuario.password = null;
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

  activar(id: number) {

    this.usuariosService.activar(id).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  desactivar(id: number) {

    this.usuariosService.desactivar(id).subscribe({
      next: this.handleSucces.bind(this)
    });
  }

  showDialogPassword(id: number) {
    this.displayPassword = true;
    this.passwordForm.reset();
    this.passwordForm.get('id').setValue(id);
  }

  changePassword(): void {
    this.usuariosService.changePassword(this.passwordForm.value).subscribe({
      next: this.handleSuccesPassword.bind(this)
    });
  }

  handleSuccesPassword(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: 'Resultado', detail: data});
    this.displayPassword = false;
    
  }
}
