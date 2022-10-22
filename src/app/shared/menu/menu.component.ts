import { Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthorizationService } from '../services/authorization.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  itemsBreadcrumb: MenuItem[];

  isAuth: boolean;

  constructor(private authorizationService: AuthorizationService, private breadcrumbService: BreadcrumbService, 
    private authenticationService: AuthenticationService, private router: Router) { 
  }

  ngOnInit(): void {
    
    this.authorizationService.change.subscribe((data:boolean) => {
    
      this.items = [
        {
          label: $localize `Informes`,
          visible: this.isVisible(['SUPERUSUARIO', 'ADMINISTRADOR', 'MODIFICACION', 'CONSULTA']),
          items: [
              {label: $localize `Web`, icon: 'pi pi-cloud',
                  routerLink: ['/reportWeb'], routerLinkActiveOptions: 'active', 
                  visible: this.isVisible(['SUPERUSUARIO', 'ADMINISTRADOR'])},
              {label: $localize `Excel`, icon: 'pi pi-file-excel',
                  routerLink: ['/reportExcel'], routerLinkActiveOptions: 'active', 
                  visible: this.isVisible(['SUPERUSUARIO', 'ADMINISTRADOR'])},
              {label: $localize `Gráficos`, icon: 'pi pi-chart-line',
                  routerLink: ['/graficos'], routerLinkActiveOptions: 'active', 
                  visible: this.isVisible(['SUPERUSUARIO', 'ADMINISTRADOR', 'MODIFICACION'])}
          ]
          },
          {
            label: $localize `Administración`,
            visible: this.isVisible(['SUPERUSUARIO', 'ADMINISTRADOR', 'MODIFICACION']),
            items: [
                {label: $localize `Usuarios`, icon: 'pi pi-users',
                    routerLink: ['/usuarios'], routerLinkActiveOptions: 'active', 
                    visible: this.isVisible(['SUPERUSUARIO', 'ADMINISTRADOR'])},
                {label: $localize `Configuración`, icon: 'pi pi-cog',
                    routerLink: ['/configuracion'], routerLinkActiveOptions: 'active', 
                    visible: this.isVisible(['SUPERUSUARIO', 'ADMINISTRADOR'])},
                {label: $localize `Logs`, icon: 'pi pi-book',
                    routerLink: ['/logs'], routerLinkActiveOptions: 'active', 
                    visible: this.isVisible(['SUPERUSUARIO', 'ADMINISTRADOR'])}
            ]
            }
      ];

      this.isAuth = data;
    });
    this.breadcrumbService.change.subscribe((data: string) => { 
      this.itemsBreadcrumb = [
        {label: $localize ` - Home`, icon: 'pi pi-home'},
        {label: data}
      ];
    });
  }

  isVisible(roles: string[]): boolean {
    return this.authorizationService.isVisible(roles);
  }

  logout(): void {
    this.authenticationService.logout().subscribe({
      next: this.mensaje.bind(this)
    });
  }

  mensaje(data: string): void {
    this.authorizationService.eliminarAuth();
    this.router.navigate(['']);
  }

}
