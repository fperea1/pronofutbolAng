import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule} from 'primeng/breadcrumb';
import { AuthorizationService } from '../services/authorization.service';
import { AuthenticationService } from '../services/authentication.service';
import { BreadcrumbService } from './breadcrumb.service';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    RouterModule,
    ButtonModule,
    BreadcrumbModule
  ],
  exports: [
    MenuComponent
  ],
  providers: [
    AuthorizationService,
    AuthenticationService,
    BreadcrumbService
  ]
})
export class MenuModule { }
