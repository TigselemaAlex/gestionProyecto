import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, ReservasRoutingModule, SharedModule],
  providers: [MessageService, ConfirmationService],
})
export class ReservasModule {}
