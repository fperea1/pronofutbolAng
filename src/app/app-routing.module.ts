import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './modulos/authentication/authentication.module';
import { AuthenticationComponent } from './modulos/authentication/authentication.component';
import { WelcomeModule } from './modulos/welcome/welcome.module';
import { LogsModule } from './modulos/logs/logs.module';
import { ConfiguracionModule } from './modulos/configuracion/configuracion.module';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: '**', component: AuthenticationComponent },
];

@NgModule({
  imports: [
    CommonModule,
    AuthenticationModule,
    WelcomeModule,
    LogsModule,
    ConfiguracionModule,
    UsuariosModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
