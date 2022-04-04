import { Injectable, EventEmitter, Output  } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot } from '@angular/router';


import jwt_decode from 'jwt-decode';

const helper = new JwtHelperService();

@Injectable()
export class AuthorizationService {

  isAuth: boolean;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private tokenStorageService: TokenStorageService) { }

  cargarAuth() {
    this.isAuth = this.isAuthenticated();
    this.change.emit(this.isAuth);
  }

  eliminarAuth() {
    this.isAuth = false;
    this.tokenStorageService.signOut();
    this.change.emit(this.isAuth);
  }

  public isAuthenticated(): boolean {

    const token = this.tokenStorageService.getToken();
    if (token == null) { return false; }

    return !helper.isTokenExpired(token);
  }

  isVisible(roles: string[]): boolean {

    const token = this.tokenStorageService.getToken();
    if (token == null) { return false; } 
    const tokenPayLoad: any = jwt_decode(token);
    return this.existsRol(roles, tokenPayLoad.authorization);
  }

  existsRol(roles: string[], rolesToken: string[]): boolean {

    for (const rol of roles) {
        if (rolesToken.includes(rol)) {
            return true;
        }
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    const expectedRole = route.data['expectedRole'];
    const token = this.tokenStorageService.getToken();
    const tokenPayLoad: any  = jwt_decode(token);

    if (!this.isAuthenticated() ||
            !this.existsRol(expectedRole, tokenPayLoad.authorization)) {
      return false;
    }
    return true;
  }
}
