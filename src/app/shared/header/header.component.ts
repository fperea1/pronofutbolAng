import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Country } from './country';
import { LocaleStorageService } from '../services/locale-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  
  selectedCountry: Country;

  countries: Country[];

  showFlags: boolean;

  classFlagSelected: string;

  constructor(private messageService: MessageService, private localeStorageService: LocaleStorageService) {
    
  }

  ngOnInit(): void {
    this.countries = [
      {name: '中國人', code: 'cn'},
      {name: 'English', code: 'gb'},
      {name: 'Français', code: 'fr'},
      {name: 'Deutsch', code: 'de'},
      {name: 'Italiano', code: 'it'},
      {name: 'Español', code: 'es'}
    ]; 

    this.setSelectedCountry(null);

    this.showFlags = false;

    this.classFlagSelected = 'flagSelected';
  }

  setSelectedCountry(code:string) {
    
    var lang = code == null ? navigator.language.substring(0,2) : code;
    switch (lang) {
      case "es":
        this.selectedCountry = {name: 'Español', code: 'es'};
        break;
      case "gb":
        this.selectedCountry = {name: 'English', code: 'gb'};
        break;
      case "cn": 
        this.selectedCountry = {name: '中國人', code: 'cn'};
        break;
      case "fr": 
        this.selectedCountry = {name: 'Français', code: 'fr'};
        break;
      case "de": 
        this.selectedCountry = {name: 'Deutsch', code: 'de'};
        break;
      case "it": 
        this.selectedCountry = {name: 'Italiano', code: 'it'};
        break;
      default: 
        this.selectedCountry = {name: 'Español', code: 'es'};
    }
  }

  clear(): void {
    this.messageService.clear();
  }

  showFlagsDiv(): void {
    this.showFlags = !this.showFlags;
    this.classFlagSelected = this.classFlagSelected == 'flagSelected2' ? 'flagSelected': 'flagSelected2';
  }

  changeFlag(code: string) {
    this.setSelectedCountry(code);
    this.showFlags = !this.showFlags;
    this.classFlagSelected = 'flagSelected';
    this.localeStorageService.saveLang(this.getLocale(code));
  }

  
  getLocale(code: string): string {
    var locale = '';
    switch (code) {
      case "es":
        locale = 'es_ES';
        break;
      case "gb":
        locale = 'en_GB';
        break;
      case "cn": 
        locale = 'zh_CN';
        break;
      case "fr": 
      locale = 'fr_FR';
        break;
      case "de": 
      locale = 'de_DE';
        break;
      case "it": 
      locale = 'it_IT';
        break;

      default: 
      locale = 'es_ES';
    }
    return locale;
  }

}

