import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisesRoutingModule } from './paises-routing.module';
import { PaisesComponent } from './paises.component';
import { PaisesService } from './paises.service';
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
    PaisesComponent
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule,
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
    PaisesService
  ]
})
export class PaisesModule { }
