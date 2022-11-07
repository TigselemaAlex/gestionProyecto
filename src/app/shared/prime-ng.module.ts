import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CardModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    ToolbarModule,
    SplitButtonModule,
    SlideMenuModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
  ],
  exports: [
    CardModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    ToolbarModule,
    SplitButtonModule,
    SlideMenuModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
  ],
})
export class PrimeNgModule {}
