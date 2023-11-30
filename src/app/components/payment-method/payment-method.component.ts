import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit  {

  formPayment!: FormGroup;
  @Input() pasarDatos: any;
  @Output() enviarDato = new EventEmitter<any>()

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(){
    this.formPayment = this.formBuilder.group({
      paymentInformation: ['', Validators.required],
      cardholderName: [''],
      cardholderNumber: [0, Validators.required],
      date: ['', Validators.required],
      cvv: [0, Validators.required],
      remember: [true],
    });
  }

  sendInfoPayment() {
    this.enviarDato.emit(this.formPayment.value);
  }


}
