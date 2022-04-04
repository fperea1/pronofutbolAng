import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LogsComponent } from './logs.component';
import { LogsRoutingModule } from './logs-routing.module';
import { TableModule } from 'primeng/table';
import { LogService } from './log.service';



@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    LogsRoutingModule,
    TableModule
  ],
  providers: [
    LogService
  ]
})
export class LogsModule { }
