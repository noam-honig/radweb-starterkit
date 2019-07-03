import { Component, OnInit } from '@angular/core';
import { RunOnServer } from '../shared/auth/server-action';
import { Context } from '../shared/context';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  clickMe() {
    HomeComponent.test();
  }
  @RunOnServer({ allowed: () => true })
  static test(context?: Context) {
    console.log('hi');
    console.log(context.user);
  }
}

