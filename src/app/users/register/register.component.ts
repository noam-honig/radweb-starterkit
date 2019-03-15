import { Component, OnInit } from '@angular/core';

import {  StringColumn } from 'radweb';
import { Route } from '@angular/router';
import { Context } from '../../shared/context';
import { Users } from '../users';
import { AuthService } from '../../shared/auth/auth-service';
import { NotLoggedInGuard } from '../../shared/auth/auth-guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService,private context:Context) {


  }
  

  confirmPassword = new StringColumn({ caption: 'Confirm Password', inputType: 'password' });
  helpers = this.context.for(Users).gridSettings({
    numOfColumnsInGrid: 0,
    allowUpdate: true,
    columnSettings: h => [
      h.name,
      
      h.password,
      { column: this.confirmPassword },
    ],
    onValidate: h => {
      if (h)
        if (h.password.value != this.confirmPassword.value) {
          h.password.error = "passwords do not match";
        }
    }
  });




  ngOnInit() {
    this.helpers.addNewRow();
  }
  async register() {
    try {
      let userInfo = this.helpers.currentRow;
      await this.helpers._doSavingRow(userInfo);
      this.auth.login(userInfo.name.value, this.confirmPassword.value, false, () => { });
    }
    catch (err) {
      console.log(err);
    }

  }
}
