import { Injectable } from "@angular/core";
import { myAuthInfo } from "./my-auth-info";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { evilStatics } from "./evil-statics";
import { RunOnServer } from "./server-action";
import { DialogService } from '../../select-popup/dialog';
import { Context } from '../context';
import { Users } from '../../users/users';
import { MyRouterService } from '../my-router-service';

import { HomeComponent } from '../../home/home.component';
//import { UpdateInfoComponent } from 'src/app/users/update-info/update-info.component';



import { JwtHelperService } from '@auth0/angular-jwt';
import { myRouteData, dummyRoute } from '../../app-routing.module';

const authToken = 'authorization';
@Injectable()
export class AuthService {

    hasRole(allowedRoles?: string[]) {
        if (!this.user)
            return false;
        if (!allowedRoles)
            return true;
        if (!this.user.roles)
            return false;
        for (const role of allowedRoles) {
            if (this.user.roles.indexOf(role) >= 0)
                return true;
        }
        return false;
    }
    user: UserInfo;
    constructor(
        private dialog: DialogService,
        private router: MyRouterService
    ) { }

    async signIn(user: string, password: string) {

        let loginResult = await AuthService.login(user, password);
        if (loginResult && loginResult.authToken) {
            this.setToken(loginResult.authToken);
            document.cookie = authToken + "=" + loginResult.authToken;
            return true;
        }
        return false;
        
    }
    private currentToken: string;
    private setToken(token: string) {
        this.currentToken = token;
        this.user = undefined;
        if (this.currentToken) {
            {
                try { this.user = new JwtHelperService().decodeToken(token); }
                catch (err) { console.log(err); }

            }

        }
    }
    @RunOnServer({ allowed: () => true })
    static async login(user: string, password: string, context?: Context) {
        let result: myAuthInfo;
        

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
                
            };
        }
        return { valid: false };
    }
    signout(): any {
        this.auth.signout();
        this.router.navigate(HomeComponent);
    }
    auth = evilStatics.auth;

}
@Injectable()
export class AuthorizedGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot) {
        let allowedRoles: string[];

        let data = route.routeConfig.data as myRouteData;
        if (data && data.allowedRoles)
            allowedRoles = data.allowedRoles;



        if (this.auth.hasRole(allowedRoles)) {
            return true;
        }
        if (!(route instanceof dummyRoute))
            this.router.navigate(['/']);
        return false;
    }
}

export interface UserInfo {
    name: String;
    roles: string[];
}