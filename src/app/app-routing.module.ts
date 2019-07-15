import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './common/sign-in/home/home.component';

import { RegisterComponent } from './users/register/register.component';
import { UpdateInfoComponent } from './users/update-info/update-info.component';

import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'User Accounts', component: UsersComponent},
  
  { path: 'Register', component: RegisterComponent},
  { path: 'Account Info', component: UpdateInfoComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export interface myRoute extends Route {
  data?: myRouteData;
}
export interface myRouteData {
  allowedRoles?: string[];
  name?:string;

}
export class dummyRoute extends ActivatedRouteSnapshot {
  constructor() {
    super();

  }
  routeConfig;
}