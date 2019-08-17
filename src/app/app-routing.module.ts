import { RadWebModule, NotSignedInGuard } from 'radweb';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './users/register/register.component';
import { UpdateInfoComponent } from './users/update-info/update-info.component';

import { UsersComponent } from './users/users.component';
import { Roles, SuperAdminGuard } from './users/userInfo';


const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'User Accounts', component: UsersComponent, canActivate: [SuperAdminGuard] },

  { path: 'Register', component: RegisterComponent, canActivate: [NotSignedInGuard] },
  { path: 'Account Info', component: UpdateInfoComponent, canActivate: [NotSignedInGuard] },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RadWebModule],
  providers: [SuperAdminGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }

