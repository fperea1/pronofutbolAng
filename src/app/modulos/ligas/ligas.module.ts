import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LigasRoutingModule } from './ligas-routing.module';
import { LigasService } from './ligas.service';
import { LigasComponent } from './ligas.component';
import { PaisesService } from '../paises/paises.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext'; 
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    LigasComponent
  ],
  imports: [
    CommonModule,
    LigasRoutingModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    TableModule,
    BrowserAnimationsModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule
  ],
  providers: [
    LigasService,
    PaisesService
  ]
})
export class LigasModule { }
