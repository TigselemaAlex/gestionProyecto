import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items: any;

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
      },
    ];
  }
}
