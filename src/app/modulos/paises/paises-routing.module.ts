import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesComponent } from './paises.component';
import { AuthorizationGuard } from '../../shared/guards/authorization.guard';

const routes: Routes = [
  { 
    path : 'paises', 
    component : PaisesComponent,
    canActivate: [AuthorizationGuard],
    data: {expectedRole: ['SUPERUSUARIO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
