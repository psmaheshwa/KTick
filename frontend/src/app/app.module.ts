import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import {MaterialModule} from "./material/material.module";
import {UserModule} from "./user/user.module";
import {TicketsModule} from "./tickets/tickets.module";
import {CreateTicketService} from "./services/create-ticket.service";
import { CreateTicketFormComponent } from './tickets/create-ticket-form/create-ticket-form.component';
import {ApiInterceptor} from "./shared/api.interceptor";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    DashboardModule,
    UserModule,
    TicketsModule,
    MaterialModule,
  ],
  providers: [
    CreateTicketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[CreateTicketFormComponent]
})
export class AppModule {
}
