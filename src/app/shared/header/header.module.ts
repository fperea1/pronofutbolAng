import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


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
    MessageService
  ]
})
export class HeaderModule { }
