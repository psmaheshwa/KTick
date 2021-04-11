import {Injectable} from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {AuthenticationResult} from '@azure/msal-common';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "./api.service";

const AUTHENTICATION_KEY = 'workshop:authenticated';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private isAuthenticated = new BehaviorSubject(this.getIsAuthenticated() || false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private msalService: MsalService, private router: Router, private apiService: ApiService) {
  }


  getUserID(): string {
    return localStorage.getItem('User-ID');
  }

  setUserID(userid: string) {
    localStorage.setItem('User-ID', userid)
  }

  getAccess_token(): string {
    return localStorage.getItem('Access_Token');
  }

  setAccess_token(access_token) {
    localStorage.setItem('Access_Token', access_token);
  }

  loggedIn(): boolean {
    return this.getIsAuthenticated();
  }

  login() {
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(res.account);
      console.log("username is", this.msalService.instance.getActiveAccount().username);
      console.log(res)
      this.router.navigateByUrl('/dashboard');
      this.setAccess_token(res.idToken);
      this.setUserID(res.uniqueId)
      let name = res.account.name;
      let email = res.account.username;
      let uniqueId = res.uniqueId
      let role = 'user'
      this.apiService.loginApi({id: null, name, email, uniqueId, role}).subscribe();
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
