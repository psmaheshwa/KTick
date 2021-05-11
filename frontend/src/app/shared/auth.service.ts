import {Injectable} from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {AuthenticationResult} from '@azure/msal-common';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "./api.service";
import {shareReplay} from "rxjs/operators";

const AUTHENTICATION_KEY = 'workshop:authenticated';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private isAuthenticated = new BehaviorSubject(AuthService.getIsAuthenticated() || false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private msalService: MsalService, private router: Router, private apiService: ApiService) {
  }


  getIsAdmin(): string {
    return localStorage.getItem('isAdmin');
  }

  setIsAdmin(isAdmin: string): void {
    localStorage.setItem('isAdmin', isAdmin);
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

  setUserName(username) {
    localStorage.setItem('UserName', username);
  }

  getUserName(): string{
    return localStorage.getItem('UserName');
  }

  loggedIn(): boolean {
    return AuthService.getIsAuthenticated();
  }

  login() {
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(res.account);
      AuthService.setIsAuthenticated(true);
      this.setAccess_token(res.idToken);
      this.setUserID(res.account.username);
      this.setUserName(res.account.name);
      this.router.navigateByUrl('/dashboard').then(r => {
        this.isAuthenticated.next(true);
      });
      let name = res.account.name;
      let email = res.account.username;
      let uniqueId = res.uniqueId
      let role = 'user'
      this.apiService.loginApi({id: null, name, email, uniqueId, role}).subscribe(res => {
        this.setIsAdmin(res['data']['user'].role);
      });
    });
  }

  logout() {
    this.msalService.logout();
    AuthService.setIsAuthenticated(false);
    this.isAuthenticated.next(false);
  }


  private static getIsAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem(AUTHENTICATION_KEY));
  }

  private static setIsAuthenticated(isAuthenticated: boolean) {
    localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(isAuthenticated));
  }
}
