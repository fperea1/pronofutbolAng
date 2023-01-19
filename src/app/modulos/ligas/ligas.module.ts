import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LigasRoutingModule } from './ligas-routing.module';
import { LigasService } from './ligas.service';
import { LigasComponent } from './ligas.component';


@NgModule({
  declarations: [
    LigasComponent
  ],
  imports: [
    CommonModule,
    LigasRoutingModule
  ],
  providers: [
    LigasService
  ]
})
export class LigasModule { }
