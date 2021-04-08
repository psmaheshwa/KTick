import {Injectable} from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {AuthenticationResult} from '@azure/msal-common';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

const AUTHENTICATION_KEY = 'workshop:authenticated';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private isAuthenticated = new BehaviorSubject(this.getIsAuthenticated() || false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private msalService: MsalService, private router: Router) {
  }

  account: any

  loggedIn(): boolean {
    return this.getIsAuthenticated();
  }

  login() {
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      this.account = this.msalService.instance.setActiveAccount(res.account);
      console.log("username is", this.msalService.instance.getActiveAccount().username);
      this.router.navigateByUrl('/dashboard');
    });
    this.setIsAuthenticated(true);
  }

  logout() {
    this.msalService.logout();
    this.setIsAuthenticated(false);
    this.isAuthenticated.next(false);
  }

  private getIsAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem(AUTHENTICATION_KEY));
  }

  private setIsAuthenticated(isAuthenticated: boolean) {
    localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(isAuthenticated));
  }
}
