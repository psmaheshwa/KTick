import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialogConfig, MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../shared/api.service";
import {Ticket} from "./ticket";
import {CreateTicketFormComponent} from './create-ticket-form/create-ticket-form.component';
import {CreateTicketService} from "../services/create-ticket.service";


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService, private dialog: MatDialog, private service: CreateTicketService) {
  }

  projects: string[] = [
    'Dev', 'Prod', 'Test', 'Deploy',
  ];

  ngOnInit() {
    this.selectedValue = 'Created';
    this.created();
    this.dataSource.paginator = this.paginator;
  }

  fontStyleControl = new FormControl();
  displayedColumns = [];
  dataSource: MatTableDataSource<Ticket[]> = new MatTableDataSource([]);
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

  onCreate() {
    this.popupModel();
  }

  onEdit(row) {
    this.service.populateForm(row.id);
    this.popupModel();
  }

  popupModel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    
    this.dialog.open(CreateTicketFormComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(result => {
      this.onclick();
    })
  }

  onclick() {
    if (this.selectedValue == 'Assigned') {
      this.displayedColumns = ['title', 'description', 'createdBy', 'createdOn', 'dueDate', 'priority', 'status', 'edit'];
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

  created() {
    this.displayedColumns = ['title', 'description', 'assignedTo', 'createdOn', 'dueDate', 'priority', 'status', 'edit', 'delete'];
    this.apiService.created().subscribe(response => {
      this.dataSource = new MatTableDataSource(response['data']['tickets']);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  delete(id) {
    this.service.deleteTicket(id);
    this.onclick();
  }
}
