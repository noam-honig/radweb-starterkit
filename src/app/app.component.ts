import { Component, Injector, ViewChild } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';


import { Context } from 'radweb';


import { SignInComponent } from './common/sign-in/sign-in.component';

import { DialogService } from './common/dialog';
import { JwtSessionManager,canNavigateToRoute } from 'radweb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(
    public auth: JwtSessionManager,
    public router: Router,
    public activeRoute: ActivatedRoute,
    private injector: Injector,
    private dialog: MatDialog,

    public dialogService: DialogService,
    public context: Context) {
    auth.loadSessionFromCookie();

  }
  signInText() {
    if (this.context.user)
      return this.context.user.name;
    return 'Sign in';
  }
  signIn() {
    if (!this.context.user) {
      this.dialog.open(SignInComponent);
    } else {
      this.dialogService.YesNoQuestion("Would you like to sign out?", () => { this.auth.signout() });
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
      if (this.activeRoute.firstChild.data && this.activeRoute.snapshot.firstChild.data.name) {
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
    return canNavigateToRoute(route);
  }
  @ViewChild('sidenav') sidenav: MatSidenav;
  routeClicked() {
    if (this.dialogService.isScreenSmall())
      this.sidenav.close();

  }
  test() {

  }

}
