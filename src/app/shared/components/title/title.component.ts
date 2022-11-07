import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  public menuItem!: MenuItem;
  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    const currentPath = `${this.router.url}`;
    this.menuItem = this.menuService.getMenuByUrl(currentPath);
  }
}
