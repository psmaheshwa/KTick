import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateTicketFormComponent } from './create-ticket-form/create-ticket-form.component';


@NgModule({
  declarations: [TicketsComponent, CreateTicketFormComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TicketsModule { }
