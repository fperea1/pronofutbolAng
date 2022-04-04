import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthorizationService } from '../shared/services/authorization.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent implements OnInit {

  authenticationForm: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private tokenStorageService: TokenStorageService,
                private router: Router, private messageService: MessageService, private authorizationService: AuthorizationService) {
    
  }

  ngOnInit(): void {
    this.authenticationForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      'password': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    });
  }

  login(): void {

    this.authenticationService.attemptAuthentication(this.authenticationForm.value).subscribe({
      next: this.saveToken.bind(this)
    });
  }

  saveToken(data: string): void {
    this.tokenStorageService.saveToken(data);
    this.authorizationService.cargarAuth();
    this.router.navigate(['welcome']); 
  }

}
