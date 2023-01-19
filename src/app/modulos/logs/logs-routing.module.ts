import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs.component';
import { AuthorizationGuard } from '../../shared/guards/authorization.guard'

const logsRoutes: Routes = [
  { 
    path : 'logs', 
    component : LogsComponent,
    canActivate: [AuthorizationGuard],
    data: {expectedRole: ['SUPERUSUARIO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(logsRoutes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
