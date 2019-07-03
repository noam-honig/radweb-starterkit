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

import { UpdateInfoComponent } from './users/update-info/update-info.component';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './home/home.component';

import { WaitComponent } from './shared/wait/wait.component';
import { YesNoQuestionComponent } from './select-popup/yes-no-question/yes-no-question.component';
import { MyRouterService } from './shared/my-router-service';
import { SignInComponent } from './common/sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    
    UpdateInfoComponent,
    RegisterComponent,
    WaitComponent,
    YesNoQuestionComponent,
    HomeComponent,
    SignInComponent

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
    MyRouterService
  ],
  entryComponents:[WaitComponent,YesNoQuestionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
