import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadWebModule } from 'radweb';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { UsersComponent } from './users/users.component';
import { UpdateInfoComponent } from './users/update-info/update-info.component';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './home/home.component';
import { WaitComponent } from './shared/wait/wait.component';
import { SignInComponent } from './common/sign-in/sign-in.component';
import { DialogService } from './common/dialog';
import { BusyService } from './common/busy-service';
import { YesNoQuestionComponent } from './common/yes-no-question/yes-no-question.component';
import { InputAreaComponent } from './common/input-area/input-area.component';
import { SelectPopupComponent } from './common/select-popup/select-popup.component';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.urlWithParams);
    return next.handle(req);
  }
}



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,

    UpdateInfoComponent,
    RegisterComponent,
    WaitComponent,
    YesNoQuestionComponent,
    HomeComponent,
    SignInComponent,
    SelectPopupComponent,
    InputAreaComponent,

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


    DialogService,
    BusyService,

    SelectPopupComponent,
    InputAreaComponent
  ],
  entryComponents: [WaitComponent, YesNoQuestionComponent, SignInComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


