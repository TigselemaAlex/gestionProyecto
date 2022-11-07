import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private showForm = new BehaviorSubject<boolean>(false);
  public showForm$ = this.showForm.asObservable();

  private data = new BehaviorSubject<any>({});
  public data$ = this.data.asObservable();

  constructor() {}

  public toggleForm(toggle: boolean) {
    this.showForm.next(toggle);
  }

  public sendData(data: any) {
    this.data.next(data);
  }
}
