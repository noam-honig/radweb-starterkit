import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth-service';
import { MyRouterService } from '../my-router-service';
import { LoginComponent } from '../../users/login/login.component';
import { HomeComponent } from '../../home/home.component';


@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private auth: AuthService,
        private router: MyRouterService) {
    }
    canActivate(route: ActivatedRouteSnapshot) {
        if (this.auth.auth.valid)
            return true;
        if (!(route instanceof dummyRoute))
            this.router.navigate(LoginComponent);
        return false;
    }
}
@Injectable()
export class NotLoggedInGuard implements CanActivate {
    constructor(private auth: AuthService) {
    }
    canActivate(route: ActivatedRouteSnapshot) {
        return !this.auth.auth.valid;
    }
}

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private auth: AuthService, private router: MyRouterService) {
    }
    canActivate(route: ActivatedRouteSnapshot) {
        if (this.auth.auth.valid && (this.auth.auth.info.superAdmin))
            return true;
        if (!(route instanceof dummyRoute))
            this.router.navigate(HomeComponent);
        return false;
 
    }
}

export class dummyRoute extends ActivatedRouteSnapshot {
    constructor() {
        super();

    }
    routeConfig;
}