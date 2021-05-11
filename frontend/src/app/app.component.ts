import {Component} from '@angular/core';
import {shareReplay} from "rxjs/operators";
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KTick';
  links = [
    {path: '/dashboard', icon: 'home', title: 'Dashboard'},
    {path: '/tickets', icon: 'confirmation_number', title: 'Tickets'},
    {path: '/users', icon: 'person', title: 'Users'},
  ];

  accessToken = this.authService.getAccess_token();
  username = this.authService.getUserName();
  isAuthenticated$ = this.authService.isAuthenticated$.pipe(shareReplay(1));

  constructor(private authService: AuthService) {
    console.log(this.username);
  }

  logout() {
    this.authService.logout();
  }

}
