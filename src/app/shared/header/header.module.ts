import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { LocaleStorageService } from '../services/locale-storage.service';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    DialogModule
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
