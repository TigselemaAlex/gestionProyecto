import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './page/main-page/main-page.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent, SlideMenuComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
