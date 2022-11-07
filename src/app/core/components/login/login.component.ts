import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public passwordHide: boolean = true;
  public registerForm: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showPassword(): void {
    this.passwordHide = !this.passwordHide;
  }

  toogleRegister(): void {
    this.registerForm = !this.registerForm;
  }
}
