import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {CardService} from '../services/card.service';
import {Chart, registerables} from "chart.js";
import {ApiService} from "../shared/api.service";


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

  myChart: any;
  canvas: any;
  ctx: any;
  myD: any;
  canvasD: any;
  ctxD: any;
  weekData = [];
  pieData = [];
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},

        };
      }

      return {
        columns: 4,
        miniCard: {cols: 1, rows: 1},
        chart: {cols: 2, rows: 2},
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private cardService: CardService) {
    let cards: Card[];
  }

  cards: {
    title: string;
    numbers: number;
  }[] = [
    {
      title: "",
      numbers: null
    }
  ];

  ngOnInit(): void {
    this.cards = this.cardService.getCard();

    this.apiService.totalLow().subscribe(res=>{
      this.pieData.push(res['count']);
    });

    this.apiService.totalMedium().subscribe(res=>{
      this.pieData.push(res['count']);
    });

    this.apiService.totalHigh().subscribe(res=>{
      this.pieData.push(res['count']);
    });

    this.apiService.weekChart().subscribe(res => {
      this.weekData = res['days']
      Chart.register(...registerables);
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      let days = [];
      for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.getDate() + " " + monthNames[d.getMonth()])
      }
      this.myChart = new Chart(this.ctx, {
        type: "line",
        data: {
          labels: [days[6], days[5], days[4], days[3], days[2], days[1], 'Today'],
          datasets: [
            {
              label: 'Open Tickets',
              data: [this.weekData[6].Open, this.weekData[5].Open, this.weekData[4].Open, this.weekData[3].Open, this.weekData[2].Open, this.weekData[1].Open, this.weekData[0].Open],
              backgroundColor: '#1adbc5',
              borderColor: '#1adbc5',
              fill: false,
            },
            {
              label: 'Closed Tickets',
              data: [this.weekData[6].Close, this.weekData[5].Close, this.weekData[4].Close, this.weekData[3].Close, this.weekData[2].Close, this.weekData[1].Close, this.weekData[0].Close],
              backgroundColor: '#ffa600',
              borderColor: '#ffa600',
              fill: false,
            }
          ]
        },
      });
      this.canvasD = document.getElementById('myD');
      this.ctxD = this.canvasD.getContext('2d');
      this.myD = new Chart(this.ctxD, {
        type: "doughnut",
        data: {
          labels: ['High', 'Medium', 'Low'],
          datasets: [
            {
              label: 'Points',
              backgroundColor: ['#00ccbe', '#ffa600', '#32c3e3'],
              data: [this.pieData[0], this.pieData[1], this.pieData[2]]
            }
          ]
        },
        options: {
          animation: {
            animateScale: true,
          }
        }
      });
    });
  }


}
