import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule  } from 'primeng/divider'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoPersonComponent } from './info-person/info-person.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    PaymentMethodComponent,
    InfoPersonComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ToastModule,
    InputMaskModule,
    ButtonModule,
    CheckboxModule,
    InputSwitchModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule
  ],
  exports: [
    PaymentMethodComponent,
    InfoPersonComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
