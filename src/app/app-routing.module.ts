import { AuthorizedGuardRoute } from 'radweb';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './users/register/register.component';
import { UpdateInfoComponent } from './users/update-info/update-info.component';

import { UsersComponent } from './users/users.component';
import { Roles } from './shared/auth/userInfo';
import { AuthorizedGuard, NotLoggedInGuard } from 'radweb';

const routes: AuthorizedGuardRoute[] = [
  { path: 'Home', component: HomeComponent },
  { path: 'User Accounts', component: UsersComponent, canActivate: [AuthorizedGuard], data: { allowedRoles: [Roles.superAdmin] } },

  { path: 'Register', component: RegisterComponent, canActivate: [NotLoggedInGuard] },
  { path: 'Account Info', component: UpdateInfoComponent, canActivate: [AuthorizedGuard], data: { allowedRoles: [Roles.superAdmin] } },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

