import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LanguageStorageService } from '../services/language-storage.service';
import { AuthorizationService } from '../services/authorization.service';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    MessageService,
    LanguageStorageService,
    AuthorizationService
  ]
})
export class HeaderModule { }
