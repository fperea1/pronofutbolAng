import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JornadasRoutingModule } from './jornadas-routing.module';
import { JornadasComponent } from './jornadas.component';
import { JornadasService } from './jornadas.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JornadasComponent
  ],
  imports: [
    CommonModule,
    JornadasRoutingModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    TableModule,
    BrowserAnimationsModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  providers: [
    JornadasService
  ]
})
export class JornadasModule { }
