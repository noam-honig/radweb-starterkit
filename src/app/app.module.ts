import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RadWebModule } from 'radweb';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,RadWebModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
