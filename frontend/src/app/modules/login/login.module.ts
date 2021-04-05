import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// inbuilt modules
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
