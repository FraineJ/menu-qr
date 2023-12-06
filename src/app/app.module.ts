import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TruncateTextPipe } from './pipe/textShor.pipe';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import * as firebase from 'firebase/app';
import { environment } from 'src/environment/environment.dev';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ComponentsModule } from './components/components.module';
import { StepsModule } from 'primeng/steps';
import { BadgeModule } from 'primeng/badge';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, TruncateTextPipe, ProductDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    StepsModule,
    BadgeModule,
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
