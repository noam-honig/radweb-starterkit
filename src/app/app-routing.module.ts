import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { UpdateInfoComponent } from './users/update-info/update-info.component';
import { NotLoggedInGuard, LoggedInGuard, AdminGuard } from './shared/auth/auth-guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'User Accounts', component: UsersComponent,canActivate:[AdminGuard] },
  { path: 'Sign In', component: LoginComponent, canActivate: [NotLoggedInGuard] },
  { path: 'Register', component: RegisterComponent, canActivate: [NotLoggedInGuard] },
  { path: 'Account Info', component: UpdateInfoComponent, canActivate: [LoggedInGuard] },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
