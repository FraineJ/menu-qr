import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.scss'],
})
export class InfoPersonComponent implements OnInit {

  formInfoUser!: FormGroup;
  @Input() itemActual = 0;
  @Output() enviarDato = new EventEmitter<any>();
  @Output() enviarItemCurrent = new EventEmitter<any>();


  constructor(private router: Router, private formBuilder: FormBuilder, private messageService: MessageService ) {}

  ngOnInit() {
    this.getDataLocalStores();
    this.formInfoUser = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: [''],
      email: ['',Validators.required],
      address: ['', Validators.required]
    });
  }

  sendInfoPayment() {
    if (this.itemActual <= 1) {
      this.itemActual += 1;
      this.enviarDato.emit(this.formInfoUser.value);
    }
  }

  backStep() {
    if (this.itemActual == 1) {
      this.itemActual -= 1;
      this.enviarItemCurrent.emit(this.itemActual);
    }
  }

  validateForm() {
    this.formInfoUser.markAllAsTouched();
    let validForm = this.formInfoUser.valid;

    validForm
      ? this.sendInfoPayment()
      : this.messageService.add({
          severity: 'error',
          summary: 'Campos Requerido',
          detail: 'Hay campos obligatorios',
        }
      );
  }

  getDataLocalStores() {
    let data = localStorage.getItem("formPayment");
    console.log("getDataLocalStores ", data);
  }

}
