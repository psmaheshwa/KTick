import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {CardService} from '../services/card.service';
import {Chart,registerables} from "chart.js";


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
  
  myChart:any;
  canvas:any;
  ctx:any;
  myD:any;
  canvasD:any;
  ctxD:any;
  
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
    
   Chart.register(...registerables);
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
   
    this.myChart = new Chart(this.ctx, {
     type:"line",
      data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
          datasets: [{
              label: 'Resolved tickets',
              data: [12, 19, 3, 5, 2, 3,36],
              backgroundColor:'#ff0695',
              borderColor: '#ff0695',
              fill:false,
          },
          {
            label: 'Open Tickets',
            data: [14, 58, 23, 5, 10, 3,31],
            backgroundColor:'#1adbc5',
            borderColor: '#1adbc5',
            fill:false,
          },
          {
            label: 'Priority Tickets',
            data: [3, 8, 23, 5, 0, 3,1],
            backgroundColor:'#ffa600',
            borderColor: '#ffa600',
            fill:false,
          }
        ]
      },
      });
      this.canvasD=document.getElementById('myD');
      this.ctxD=this.canvasD.getContext('2d');
  
      this.myD= new Chart(this.ctxD, {
        type:"doughnut",
        data:{
          labels:['Open Tickets','Resolved Tickets','Due Tickets'],
          datasets:[
            {
              label:'Points',
              backgroundColor:['#00ccbe','#ffa600','#32c3e3'],
              data:[10,5,13]
            }
          ]
        },
        options:{
          animation:{
            animateScale:true,
            }
        }
})

  }


}
