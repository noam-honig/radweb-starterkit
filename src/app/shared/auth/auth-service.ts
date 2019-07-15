import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { MyRouterService } from '../my-router-service';
import { HomeComponent } from '../../home/home.component';



import { JwtHelperService } from '@auth0/angular-jwt';
import { myRouteData, dummyRoute } from '../../app-routing.module';
import { UserInfo, Roles } from './userInfo';

import { ContextUserProvider } from '../context-user-provider';
import { JWTCookieAuthorizationHelper } from './jwt-cookie-authoerization-helper';
import { RunOnServer } from './server-action';
import { Context } from '../context';
import { Users } from '../../users/users';
import { evilStatics } from './evil-statics';


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
        private router: MyRouterService
    ) { 
        let c = document.cookie;
        let i = c.indexOf(authToken + '=');
        if (i >= 0) {
            c = c.substring(i + authToken.length + 2).trim();
            i = c.indexOf(';');
            if (i >= 0) {
                c = c.substring(0, i - 1);
            }
            this.setToken(c);

        }

    }

    async signIn(user: string, password: string) {

        let loginResult = await AuthService.signIn(user, password);
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

    signout(): any {
        this.setToken('');
        document.cookie = authToken + '=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        this.user = undefined;
        this.router.navigate(HomeComponent);
    }
    

    static helper:JWTCookieAuthorizationHelper<UserInfo>;

    @RunOnServer({ allowed: () => true })
    static async signIn(user: string, password: string, context?: Context) {
        let result: UserInfo;
        await context.for(Users).foreach(h => h.name.isEqualTo(user), async h => {
            if (!h.realStoredPassword.value || Users.passwordHelper.verify(password, h.realStoredPassword.value)) {
                result = {
                    id: h.id.value,
                    roles: [],
                    name: h.name.value
                };
                if (h.admin.value) {
                    result.roles.push(Roles.superAdmin);
                }

            }
        });
        if (result) {
            return {
                valid: true,
                authToken: AuthService.helper.createSecuredTokenBasedOn(<any>result)

            };
        }
        return { valid: false };
    }



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


@Injectable()
export class AuthServiceContextUserProvider extends ContextUserProvider {
    constructor(private authService: AuthService) {
        super();
    }
    getUser(){
        return this.authService.user;
    }

}