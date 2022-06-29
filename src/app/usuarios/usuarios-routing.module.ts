import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { AuthorizationGuard } from '../shared/guards/authorization.guard'

const routes: Routes = [
  { 
    path : 'usuarios', 
    component : UsuariosComponent,
    canActivate: [AuthorizationGuard],
    data: {expectedRole: ['SUPERUSUARIO', 'ADMINISTRADOR']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
