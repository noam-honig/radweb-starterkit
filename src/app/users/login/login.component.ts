import { Component, OnInit } from '@angular/core';
import {  Route } from '@angular/router';
import { AuthService } from '../../shared/auth/auth-service';


import { MyRouterService } from '../../shared/my-router-service';
import { RegisterComponent } from '../register/register.component';

@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: MyRouterService
  ) { }
  user: string;
  password: string;
  remember: boolean;
  ngOnInit() {
  }

  login() {
    this.auth.login(this.user, this.password, this.remember, () => this.password = '');

  }
  register() {
    this.router.navigate(RegisterComponent);
  }
}
