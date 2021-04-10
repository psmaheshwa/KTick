import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialogConfig,MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../shared/api.service";
import {User} from "../user/user";
import {Ticket} from "./ticket";
import { from } from 'rxjs';
import { CreateTicketFormComponent } from './create-ticket-form/create-ticket-form.component';



@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService,private dialog:MatDialog) {
  }
  projects: string[] = [
    'Dev','Prod','Test','Deploy',
  ];

  ngAfterViewInit() {}



  ngOnInit() {
    this.selectedValue = 'Created';
    this.created();
    this.dataSource.paginator = this.paginator;
  }

  fontStyleControl = new FormControl();
  displayedColumns = [];
  dataSource: MatTableDataSource<Ticket[]> = new MatTableDataSource([]) ;
  selectedValue: String;
  toggleOptions: Array<String> = ["Created", "Assigned"];
  selectedProject: String;
  UserID: string = '60649114e7d8ea316bab697b';

  selectionChanged(item) {
    this.selectedValue = item.value;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="45%";
    dialogConfig.height="90%";
    this.dialog.open(CreateTicketFormComponent,dialogConfig);
  }


  onclick() {
    if (this.selectedValue == 'Assigned') {
      this.displayedColumns = ['title', 'description', 'createdBy', 'createdOn', 'dueDate', 'priority', 'status'];
      this.apiService.assigned().subscribe(response => {
        this.dataSource = new MatTableDataSource(response['data']['tickets']);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

      this.dataSource.sort = this.sort;
    } else {
      if (this.selectedValue == 'Created') {
        this.created();

      }
    }
  }
created(){
  this.displayedColumns = ['title', 'description', 'assignedTo', 'createdOn', 'dueDate', 'priority', 'status'];
  this.apiService.created().subscribe(response => {
    this.dataSource = new MatTableDataSource(response['data']['tickets']);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  })
}
  refreshTable() {
  }
}
