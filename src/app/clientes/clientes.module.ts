import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';

import { MainPageComponent } from './page/main-page/main-page.component';
import { MessageService, ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, ClientesRoutingModule, SharedModule],
  providers: [MessageService, ConfirmationService],
})
export class ClientesModule {}
