import { NgModule } from '@angular/core';


import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';


@NgModule({
  exports: [
    ButtonModule,
    DialogModule,
    RadioButtonModule,
    ConfirmDialogModule,
    SidebarModule,
    MessagesModule,
    ToastModule,
    SpeedDialModule
  ],
})
export class PrimeNgModule {}
