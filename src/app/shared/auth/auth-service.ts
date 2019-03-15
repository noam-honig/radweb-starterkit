import { Injectable } from "@angular/core";
import { myAuthInfo } from "./my-auth-info";
import { Router } from "@angular/router";
import { evilStatics } from "./evil-statics";
import { RunOnServer } from "./server-action";
import { DialogService } from '../../select-popup/dialog';
import { Context } from '../context';
import { Users } from '../../users/users';
import { MyRouterService } from '../my-router-service';

import { HomeComponent } from '../../home/home.component';
//import { UpdateInfoComponent } from 'src/app/users/update-info/update-info.component';
import { LoginComponent } from '../../users/login/login.component';


@Injectable()
export class AuthService {

    constructor(
        private dialog: DialogService,
        private router: MyRouterService
    ) { }

    async login(user: string, password: string, remember: boolean, fail: () => void) {

        let loginResponse = await AuthService.login(user, password);
        this.auth.loggedIn(loginResponse, remember);
        if (this.auth.valid) {
            if (loginResponse.requirePassword) {
                this.dialog.YesNoQuestion('Hi ' + this.auth.info.name + ' a password is required for your account, please define a password.', () => {
                    this.router.navigate(HomeComponent);// I wanted to go to Update Info component but it caused a crash in angular
                });
            }
            else {
                this.router.navigate(HomeComponent)
            }

        }
        else {
            this.dialog.Error("Unknown user name or wrong password");
            fail();
        }
    }
    @RunOnServer({ allowed: () => true })
    static async login(user: string, password: string, context?: Context) {
        let result: myAuthInfo;
        let requirePassword = false;

        await context.for(Users).foreach(h => h.name.isEqualTo(user), async h => {
            if (!h.realStoredPassword.value || evilStatics.passwordHelper.verify(password, h.realStoredPassword.value)) {
                result = {
                    loggedIn: true,
                    helperId: h.id.value,
                    superAdmin: h.admin.value,
                    
                  
                    name: h.name.value
                };
                
            }
        });
        if (result) {
            return {
                valid: true,
                authToken: evilStatics.auth.createTokenFor(result),
                requirePassword
            };
        }
        return { valid: false, requirePassword: false };
    }
    signout(): any {
        this.auth.signout();
        this.router.navigate(LoginComponent);
    }
    auth = evilStatics.auth;

}
