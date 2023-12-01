import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  providers: [MessageService],
})
export class PaymentMethodComponent implements OnInit {
  formPayment!: FormGroup;
  @Input() itemActual: any;
  @Output() enviarDato = new EventEmitter<any>();
  @Output() enviarCurrenItem = new EventEmitter<any>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.formPayment = this.formBuilder.group({
      cardholderName: ['', Validators.minLength(2)],
      cardholderNumber: [0, Validators.required],
      date: ['', Validators.required],
      cvv: [0, Validators.required],
    });
  }
  sendInfoPayment() {
    if (this.itemActual < 1) {
      this.itemActual += 1;
      this.enviarDato.emit({
        data: this.formPayment.value,
        item: this.itemActual,
      });
    }
  }

  sendCurrentItemBack() {
    if (this.itemActual == 1) {
      this.itemActual -= 1;
      this.enviarCurrenItem.emit(this.itemActual);
    }
  }

  cargardata(){

  }

  validateForm() {
    this.formPayment.markAllAsTouched();
    let validForm = this.formPayment.valid;

    validForm
      ? this.sendInfoPayment()
      : this.messageService.add({
          severity: 'error',
          summary: 'Campos Requerido',
          detail: 'Hay campos obligatorios',
        });
  }
}
