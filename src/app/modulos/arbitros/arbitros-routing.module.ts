import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitrosComponent } from './arbitros.component';
import { AuthorizationGuard } from '../../shared/guards/authorization.guard';

const routes: Routes = [
  { 
    path : 'arbitros', 
    component : ArbitrosComponent,
    canActivate: [AuthorizationGuard],
    data: {expectedRole: ['SUPERUSUARIO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArbitrosRoutingModule { }
