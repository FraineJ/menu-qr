import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.scss'],
})
export class InfoPersonComponent implements OnInit {

  formInfoUser!: FormGroup;
  @Input() itemActual = 0;
  @Output() enviarDato = new EventEmitter<any>();

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formInfoUser = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: [''],
      email: [0, Validators.required],
      address: ['', Validators.required]
    });
  }

  sendInfoPayment() {
    if (this.itemActual < 1) {
      this.itemActual += 1;
      this.enviarDato.emit(this.formInfoUser.value);
    }
  }

}
