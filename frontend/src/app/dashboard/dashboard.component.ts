import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private msalService: MsalService) {
  }

  temp = this.msalService.instance.getActiveAccount().username;

  ngOnInit(): void {
  }


}
