import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Country } from './country';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  
  
  selectedCountry: Country;

  countries: Country[];

  filterValue = '';

  constructor(private messageService: MessageService) {
    this.countries = [
        {name: 'Australia', code: 'AU'},
        {name: 'Brazil', code: 'BR'},
        {name: 'China', code: 'CN'},
        {name: 'Egypt', code: 'EG'},
        {name: 'France', code: 'FR'},
        {name: 'Germany', code: 'DE'},
        {name: 'India', code: 'IN'},
        {name: 'Japan', code: 'JP'},
        {name: 'Spain', code: 'ES'},
        {name: 'United States', code: 'US'}
    ]; }

  ngOnInit(): void {
  }

  clear(): void {
    this.messageService.clear();
  }

  resetFlag(): void {
    this.selectedCountry = null;
    this.filterValue = '';
  }

}
