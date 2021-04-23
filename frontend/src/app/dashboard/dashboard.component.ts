import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {CardService} from '../services/card.service';

export interface Card {
  title: string;
  numbers: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },

        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },

      };
    })
  );
  constructor(private breakpointObserver: BreakpointObserver,private cardService: CardService) {let cards : Card[];}

  cards:{
    title : string;
    numbers : number;
  }[] = [
    { 
      title : "",
      numbers: null
    }
  ];

  ngOnInit(): void {
    this.cards = this.cardService.getCard();
  }


}
