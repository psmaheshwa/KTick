import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards = Array.from([
    {
      title : "Resolved tickets",
      numbers : 10
    },
    {
      title : "Open tickets",
      numbers : 15
    },
    {
      title : "High Priority tickets",
      numbers : 12
    },
    {
      title : "Delayed tickets",
      numbers : 10
    }
  ])

  getCard(){
    console.log(this.cards);
    return this.cards;
    }

  constructor() { }
}
