import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactService } from './contact.service';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  displayContacto: boolean = false;

  displayPassword: boolean = false;

  contactForm: FormGroup;

  passwordForm: FormGroup;

  isAuth: boolean;

  constructor(private fb: FormBuilder, private messageService: MessageService, 
    private contactService: ContactService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      'asunto': ['', [Validators.required]],
      'consulta': ['', [Validators.required]],
    });

    this.passwordForm = this.fb.group({
      'oldPassword': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      'newPassword': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      'newPassword2': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    });

    this.authorizationService.change.subscribe((data:boolean) => {
      this.isAuth = data;
    });
  }

  showDialogContacto() {
    this.displayContacto = true;
    this.contactForm.reset();
  }

  showDialogPassword() {
    this.displayPassword = true;
    this.passwordForm.reset();
  }

  contact(): void {
    this.contactService.sendConsulta(this.contactForm.value).subscribe({
      next: this.handleSuccesContact.bind(this)
    });
  }

  changePassword(): void {
    this.contactService.changePassword(this.passwordForm.value).subscribe({
      next: this.handleSuccesPassword.bind(this)
    });
  }

  handleSuccesContact(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: 'Resultado', detail: data});
    this.displayContacto = false;
  }

  handleSuccesPassword(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: 'Resultado', detail: data});
    this.displayPassword = false;
  }

  clear(): void {
    this.messageService.clear();
  }

}
