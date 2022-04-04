import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { WelcomeModule } from './welcome/welcome.module';
import { LogsModule } from './logs/logs.module';

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
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
