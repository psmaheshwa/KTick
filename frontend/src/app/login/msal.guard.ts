import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import {Observable} from 'rxjs';
import {AuthService} from "../shared/auth.service";

@Injectable({
  providedIn: 'any'
})
export class MsalGuard implements CanActivate {
  constructor(private authService: AuthService, private  router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.loggedIn()){
      return true
    }
    this.router.navigateByUrl('/login');
  }

}
