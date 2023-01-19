import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '../../shared/guards/authorization.guard';
import { LigasComponent } from './ligas.component';

const routes: Routes = [
  { 
    path : 'ligas', 
    component : LigasComponent,
    canActivate: [AuthorizationGuard],
    data: {expectedRole: ['SUPERUSUARIO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigasRoutingModule { }
