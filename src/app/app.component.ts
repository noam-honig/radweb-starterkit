import { Component, NgZone, Injector, ViewChild } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatSidenav, MAT_AUTOCOMPLETE_VALUE_ACCESSOR } from '@angular/material';
import { DialogService } from './select-popup/dialog';

import { Context } from './shared/context';
import { dummyRoute } from './shared/auth/auth-guard';
import { AuthService } from './shared/auth/auth-service';

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
    public dialog: DialogService,
    private context: Context) {
    auth.auth.tokenInfoChanged = () => dialog.refreshEventListener(false);
    auth.auth.tokenInfoChanged();

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
    if (this.dialog.isScreenSmall())
      this.sidenav.close();

  }
  test() {

  }

}
