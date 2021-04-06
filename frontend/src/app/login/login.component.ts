import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if(res != null && res.account != null){
          this.msalService.instance.setActiveAccount(res.account);
        }
      }
    )
  }

  isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  
  login(){
    this.msalService.loginRedirect();
  }

  logout(){
    this.msalService.logout();
  }

}
