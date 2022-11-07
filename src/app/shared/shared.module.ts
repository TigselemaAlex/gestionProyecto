import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng.module';
import { HeaderComponent } from './components/header/header.component';
import { TitleComponent } from './components/title/title.component';
import { ContainerComponent } from './components/container/container.component';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    TitleComponent,
    ContainerComponent,
    TableComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    PrimeNgModule,
    ReactiveFormsModule,
    HeaderComponent,
    TitleComponent,
    ContainerComponent,
    TableComponent,
    FormComponent,
    FormsModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
