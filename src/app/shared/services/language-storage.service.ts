import { Injectable } from '@angular/core';

const LANG_KEY = 'lang';

@Injectable()
export class LanguageStorageService {

  constructor() { }

  public saveLang(lang: string) {
    sessionStorage.removeItem(LANG_KEY);
    sessionStorage.setItem(LANG_KEY, lang);
  }

  public getLang(): string {
    return sessionStorage.getItem(LANG_KEY);
  }

}
