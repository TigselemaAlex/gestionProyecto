import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitacionesRoutingModule } from './habitaciones-routing.module';
import { MainPageComponent } from './page/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { MessageService, ConfirmationService } from 'primeng/api';
@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, HabitacionesRoutingModule, SharedModule],
  providers: [MessageService, ConfirmationService],
})
export class HabitacionesModule {}
