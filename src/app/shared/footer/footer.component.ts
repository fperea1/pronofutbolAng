import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  display: boolean = false;

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      'asunto': ['', [Validators.required]],
      'consulta': ['', [Validators.required]],
    });
  }

  showDialog() {
    this.display = true;
    this.contactForm.reset();
  }

  contact(): void {
    this.contactService.sendConsulta(this.contactForm.value).subscribe({
        next: this.handleSucces.bind(this)
      });
  }

  handleSucces(data: any): void {
    this.messageService.add({key: 'successMensaje', severity:'success', summary: 'Resultado', detail: data});
    this.display = false;
  }

  clear(): void {
    this.messageService.clear();
  }

}
