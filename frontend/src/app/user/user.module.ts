import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {MaterialModule} from "../material/material.module";
import { UserTComponent } from './user-t/user-t.component';


@NgModule({
  declarations: [UserComponent, UserTComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
