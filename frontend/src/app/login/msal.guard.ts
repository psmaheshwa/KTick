import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class MsalGuard implements CanActivate {
  constructor(private msalService: MsalService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.msalService.instance.getActiveAccount() == null){
        console.log(this.msalService.instance.getActiveAccount());
        return false;
      }
    return true;
  }
  
} 
