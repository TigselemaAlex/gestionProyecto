import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuList: MenuItem[] = [
    {
      label: 'Clientes',
      routerLink: '/home/clientes',
      icon: 'pi pi-fw pi-id-card',
    },
    {
      label: 'Habitaciones',
      routerLink: '/home/habitaciones',
      icon: 'pi pi-fw pi-home',
    },
    {
      label: 'Reservas',
      routerLink: '/home/reservas',
      icon: 'pi pi-fw pi-book',
    },
  ];

  constructor() {}
  public getMenu(): MenuItem[] {
    return [...this.menuList];
  }

  public getMenuByUrl(url: string): MenuItem {
    if (url === '/home') {
      return this.menuList[0];
    }
    return this.menuList.find(
      (menuItem) => menuItem.routerLink.toLowerCase() === url.toLowerCase()
    ) as MenuItem;
  }
}
