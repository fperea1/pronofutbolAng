import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JornadasComponent } from './jornadas.component';
import { AuthorizationGuard } from '../../shared/guards/authorization.guard';

const routes: Routes = [
  { 
    path : 'jornadas', 
    component : JornadasComponent,
    canActivate: [AuthorizationGuard],
    data: {expectedRole: ['SUPERUSUARIO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JornadasRoutingModule { }
