import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { BreadcrumbService } from '../shared/menu/breadcrumb.service';


@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ],
  providers: [
    BreadcrumbService
  ]
})
export class WelcomeModule { }
