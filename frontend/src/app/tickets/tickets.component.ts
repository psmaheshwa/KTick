import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {assigned} from "./ticket";
import {creeated} from "./ticket";
import {MatTableDataSource} from "@angular/material/table";

import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateTicketFormComponent } from './create-ticket-form/create-ticket-form.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog:MatDialog) {
  }
  projects: string[] = [
    'Dev','Prod','Test','Deploy',
  ];

  ngAfterViewInit() {}



  ngOnInit() {
    this.selectedValue = 'Created';
    this.displayedColumns = ['title', 'description', 'assignedTo', 'createdOn', 'dueDate', 'priority', 'status'];
    this.dataSource = new MatTableDataSource(creeated);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fontStyleControl = new FormControl();
  displayedColumns = [];
  dataSource: any;
  selectedValue: String;
  toggleOptions: Array<String> = ["Created", "Assigned"];
  selectedProject: String;

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
    dialogConfig.width="60%";
    this.dialog.open(CreateTicketFormComponent,dialogConfig);}


  onclick() {
    if (this.selectedValue == 'Assigned') {
      this.displayedColumns = ['title', 'description', 'createdBy', 'createdOn', 'dueDate', 'priority', 'status'];
      this.dataSource = new MatTableDataSource(assigned);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      if (this.selectedValue == 'Created') {
        this.displayedColumns = ['title', 'description', 'assignedTo', 'createdOn', 'dueDate', 'priority', 'status'];
        this.dataSource = new MatTableDataSource(creeated);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }

  refreshTable() {
  }
}
