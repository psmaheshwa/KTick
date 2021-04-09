import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '../login/msal.guard';
import { CreateTicketFormComponent } from './create-ticket-form/create-ticket-form.component';
import {TicketsComponent} from "./tickets.component";

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
  },
  {
    path: 'createTicket',
    component: CreateTicketFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
