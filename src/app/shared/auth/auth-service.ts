import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { MyRouterService } from '../my-router-service';
import { HomeComponent } from '../../home/home.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { myRouteData, dummyRoute } from '../../app-routing.module';
import { UserInfo } from './userInfo';
import { ContextUserProvider } from '../context-user-provider';
import { Context } from '../context';


const authToken = 'authorization';
@Injectable()
export class AuthService  {


    private user: UserInfo;
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
    getUser() {
        return this.user;
    }
    async signIn(jwtToken: string,rememberOnDevice = false) {


        if (jwtToken) {
            this.setToken(jwtToken);
            let c = authToken + "=" + jwtToken;
            if (rememberOnDevice)
            c+='; expires = Thu, 01 Jan 2076 00:00:00 GMT';
            document.cookie = c;
            return true;
        }
        else this.signout();
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
}




@Injectable()
export class AuthorizedGuard implements CanActivate {
    constructor(private context: Context, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot) {
        let allowedRoles: string[];

        let data = route.routeConfig.data as myRouteData;
        if (data && data.allowedRoles)
            allowedRoles = data.allowedRoles;

        if (this.context.hasRole(...allowedRoles)) {
            return true;
        }
        if (!(route instanceof dummyRoute))
            this.router.navigate(['/']);
        return false;
    }
}
@Injectable()
export class AuthServiceContextProvider extends ContextUserProvider {
    constructor(private authService: AuthService) {
        super();
    }
    getUser() {
        return this.authService.getUser();
    }
}


