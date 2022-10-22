import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Country } from './country';
import { LanguageStorageService } from '../services/language-storage.service';
import { AuthorizationService } from '../services/authorization.service';

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

  isAuth: boolean = false;

  constructor(private messageService: MessageService, private authorizationService: AuthorizationService,
    private languageStorageService: LanguageStorageService) {
    
  }

  ngOnInit(): void {
    
    this.redirect();
  
    this.countries = [
      {name: '中國人', code: 'zh'},
      {name: 'English', code: 'en'},
      {name: 'Français', code: 'fr'},
      {name: 'Deutsch', code: 'de'},
      {name: 'Italiano', code: 'it'},
      {name: 'Español', code: 'es'}
    ]; 

    this.setSelectedCountry(null);

    this.showFlags = false;

    this.classFlagSelected = 'flagSelected';

    this.authorizationService.change.subscribe((data:boolean) => {
      this.isAuth = data;
    });

  }

  getContextPath() {
    var context = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)); 
    return window.location.protocol+"//"+ window.location.host + context + "/";
  }

  getLanguage() {
    var lang = (this.languageStorageService.getLang() != null) ?
        this.languageStorageService.getLang().split('_')[0] : null;
    if (lang == null || lang == '') {
      lang = navigator.language.split('-')[0];
    }
    return lang; 
  }

  redirect() {
    if (window.location.pathname.length == 1) {
      window.location.href = this.getContextPath() + this.getLanguage();
    }
  };
  

  setSelectedCountry(code:string) {
   
    var lang = (this.languageStorageService.getLang() != null) ?
      this.languageStorageService.getLang().split('_')[0] : null;
   // alert('GG'+lang+'GG');
    if (lang == null || lang == '') {
      lang = code == null ? this.getLanguage() : code;
    }
    switch (lang) {
      case "es":
        this.selectedCountry = {name: 'Español', code: 'es'};
        break;
      case "en":
      case "gb":
        this.selectedCountry = {name: 'English', code: 'en'};
        break;
      case "cn": 
      case "zh": 
        this.selectedCountry = {name: '中國人', code: 'zh'};
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
    //this.setSelectedCountry(code);
    this.showFlags = !this.showFlags;
    this.classFlagSelected = 'flagSelected';
    this.languageStorageService.saveLang(this.getLocale(code));
    window.location.href = this.getContextPath()+code;
  }
  
  getLocale(code: string): string {
    var locale = '';
    switch (code) {
      case "es":
        locale = 'es_ES';
        break;
      case "gb":
      case "en":
        locale = 'en_GB';
        break;
      case "cn": 
      case "zh": 
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

