import {Injectable} from '@angular/core';
import {ApiService} from "../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private apiService: ApiService) {
  }

  cards = Array.from([{title: 'Assigned Tickets', numbers: 0},
    {title: 'Total Open', numbers: 0},
    {title: 'Total Resolved', numbers: 0},
    {title: 'Today Due', numbers: 0},
    {title: 'Due Exceeded', numbers: 0},
    {title: 'Total High', numbers: 0},
    {title: 'Total Medium', numbers: 0},
    {title: 'Total Low', numbers: 0},
  ]);

  OnInit() {
    this.apiService.totalAssigned().subscribe(data => {
      this.cards[0]["numbers"] = data['count'];
    });

    this.apiService.totalOpened().subscribe(data => {
      this.cards[1]["numbers"] = data['count'];
    });

    this.apiService.totalResolved().subscribe(data => {
      this.cards[2]["numbers"] = data['count'];
    });

    this.apiService.totalToday().subscribe(data => {
      this.cards[3]["numbers"] = data['count'];
    });

    this.apiService.totalDueExceeded().subscribe(data => {
      this.cards[4]["numbers"] = data['count'];
    });

    this.apiService.totalHigh().subscribe(data => {
      this.cards[5]["numbers"] = data['count'];
    });

    this.apiService.totalMedium().subscribe(data => {
      this.cards[6]["numbers"] = data['count'];
    });

    this.apiService.totalLow().subscribe(data => {
      this.cards[7]["numbers"] = data['count'];
    });

  }

  getCard() {
    this.OnInit()
    return this.cards;
  }

}
