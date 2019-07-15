import { Component, NgZone, Injector, ViewChild, Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatSidenav, MAT_AUTOCOMPLETE_VALUE_ACCESSOR } from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import { DialogService } from './select-popup/dialog';

import { Context } from './shared/context';

import { AuthService } from './shared/auth/auth-service';
import { SignInComponent } from './common/sign-in/sign-in.component';
import { dummyRoute } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(
    public auth: AuthService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    private injector: Injector,
    private dialog: MatDialog,
    private authService: AuthService,
    public dialogService:DialogService,
    public context: Context) {
    

  }
  signInText() {
    if (this.context.user)
      return this.context.user.name;
    return 'Sign in';
  }
  signIn() {
    if (!this.context.user) {
        this.dialog.open(SignInComponent);
    }else{
      this.dialogService.YesNoQuestion("Would you like to sign out?",()=>{this.authService.signout()});
    }
  }

  routeName(route: Route) {
    let name = route.path;
    if (route.data && route.data.name)
      name = route.data.name;
    return name;
  }

  currentTitle() {
    if (this.activeRoute && this.activeRoute.snapshot && this.activeRoute.firstChild)
      if (this.activeRoute.firstChild.data && this.activeRoute.snapshot.firstChild.data.name){
        return this.activeRoute.snapshot.firstChild.data.name;
      }
      else {
        if (this.activeRoute.firstChild.routeConfig)
          return this.activeRoute.firstChild.routeConfig.path;
      }
    return 'radweb starter kit';
  }


  signOut() {

    this.routeClicked();
    this.auth.signout();
  }
  shouldDisplayRoute(route: Route) {
    if (!(route.path && route.path.indexOf(':') < 0 && route.path.indexOf('**') < 0))
      return false;
    if (!route.canActivate)
      return true;
    for (let guard of route.canActivate) {
      let g = this.injector.get(guard) as CanActivate;
      if (g && g.canActivate) {
        var r = new dummyRoute();
        r.routeConfig = route;
        let canActivate = g.canActivate(r, undefined);
        if (!canActivate)
          return false;
      }
    }
    return true;
  }
  @ViewChild('sidenav') sidenav: MatSidenav;
  routeClicked() {
    if (this.dialogService.isScreenSmall())
      this.sidenav.close();

  }
  test() {

  }

}
