import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuinielasComponent } from './quinielas.component';
import { AuthorizationGuard } from '../../shared/guards/authorization.guard';

const routes: Routes = [
  { 
    path : 'quinielas', 
    component : QuinielasComponent,
    canActivate: [AuthorizationGuard],
    data: {expectedRole: ['SUPERUSUARIO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuinielasRoutingModule { }
