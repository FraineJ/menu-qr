import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.scss']
})


export class InfoPersonComponent implements OnInit {

  paymentInformation: any;
  cardholderName = "";
  cardholderlastName = "";
  address = "";
  email = "";
  date = Date.now();
  cvv = 0;
  remember = true;

  constructor(private router: Router) {}

  ngOnInit(){

  }

}
