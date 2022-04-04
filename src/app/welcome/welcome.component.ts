import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../shared/menu/breadcrumb.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.cambioBreadcrumb('Inicio'); 
  }

}
