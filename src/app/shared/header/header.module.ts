import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LocaleStorageService } from '../services/locale-storage.service';

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
    LocaleStorageService
  ]
})
export class HeaderModule { }
