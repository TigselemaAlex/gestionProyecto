import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() public data: any[] = [];
  @Input() public cols: string[] = [];

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  new() {
    this.formService.toggleForm(true);
    this.formService.sendData({});
  }
  edit(id: any): void {
    this.formService.sendData({ id: id });
  }

  delete(id: any): void {
    this.formService.sendData({ id: id, delete: true });
  }

  isText(value: any): boolean {
    return typeof value === 'string';
  }
}
