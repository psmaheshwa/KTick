import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private msalService: MsalService,
    private router: Router
    ) { }


  isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  
  login(){
    this.msalService.loginPopup().subscribe((res:AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(res.account);
      console.log("username is",this.msalService.instance.getActiveAccount().username);
      this.router.navigateByUrl('/auth');
    })
  }

  logout(){
    this.msalService.logout();
  }

}
