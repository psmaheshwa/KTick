import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {MaterialModule} from '../material/material.module';
import {MsalModule, MsalService, MSAL_INSTANCE} from '@azure/msal-angular';
import {PublicClientApplication, IPublicClientApplication} from '@azure/msal-browser';

// create an instance of Msal Service
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '1acd6cea-fdbd-427e-8249-cc35e977fb86',
      redirectUri: 'http://localhost:4200/dashboard'
    }
  });
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    MsalModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ]
})
export class LoginModule {
}
