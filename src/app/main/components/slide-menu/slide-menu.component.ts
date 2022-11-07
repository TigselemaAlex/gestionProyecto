import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent implements OnInit {
  public items!: MenuItem[];
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.items = this.menuService.getMenu();
  }
}
