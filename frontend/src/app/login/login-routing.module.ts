import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { MsalGuard } from './msal.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [MsalGuard]
  }
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
