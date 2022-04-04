import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthorizationService } from '../shared/services/authorization.service';

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  providers: [
    AuthenticationService,
    AuthorizationService,
    TokenStorageService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    ButtonModule
  ]
})
export class AuthenticationModule { }
