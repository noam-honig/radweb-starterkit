import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


import { JwtHelperService } from '@auth0/angular-jwt';
import { evilStatics } from './app/shared/auth/evil-statics';
if (environment.production) {
  enableProdMode();
}

evilStatics.auth.initForBrowser ( {
  decode:t=>new JwtHelperService().decodeToken(t),
  sign:(i,k)=>{throw "unable to sign jwt on browser";},
  verify:(i,k)=>{throw "unable to verify jwt on browser";}
});
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
