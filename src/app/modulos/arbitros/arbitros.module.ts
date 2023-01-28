import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArbitrosRoutingModule } from './arbitros-routing.module';
import { ArbitrosComponent } from './arbitros.component';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ArbitrosService } from './arbitros.service';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext'; 
import { ReactiveFormsModule } from '@angular/forms';
import { LigasService } from '../ligas/ligas.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ArbitrosComponent
  ],
  imports: [
    CommonModule,
    ArbitrosRoutingModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    TableModule,
    BrowserAnimationsModule,
    InputTextModule,
    ReactiveFormsModule,
    MultiSelectModule,
    CalendarModule,
    DropdownModule
  ],
  providers: [
    ArbitrosService,
    LigasService
  ]
})
export class ArbitrosModule { }
