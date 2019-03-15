import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RadWebModule } from 'radweb';
import { FormsModule } from '@angular/forms';

import { AuthService } from './shared/auth/auth-service';
import { DialogService } from './select-popup/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { BusyService } from './select-popup/busy-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Context } from './shared/context';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login/login.component';
import { UpdateInfoComponent } from './users/update-info/update-info.component';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './home/home.component';
import { NotLoggedInGuard, LoggedInGuard, AdminGuard } from './shared/auth/auth-guard';
import { WaitComponent } from './shared/wait/wait.component';
import { YesNoQuestionComponent } from './select-popup/yes-no-question/yes-no-question.component';
import { MyRouterService } from './shared/my-router-service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    UpdateInfoComponent,
    RegisterComponent,
    WaitComponent,
    YesNoQuestionComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RadWebModule
  ],
  providers: [
    AuthService,
    DialogService,
    BusyService,
    Context,
    NotLoggedInGuard,
    LoggedInGuard,
    MyRouterService,
    AdminGuard
  ],
  entryComponents:[WaitComponent,YesNoQuestionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
