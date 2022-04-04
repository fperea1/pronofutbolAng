import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext'; 
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ContactService } from './contact.service';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    FooterComponent
  ],
  providers: [
    ContactService
  ]
})
export class FooterModule { }
