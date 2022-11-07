import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './page/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent, LoginComponent],
  imports: [CommonModule, SharedModule],
  exports: [MainPageComponent],
})
export class CoreModule {}
