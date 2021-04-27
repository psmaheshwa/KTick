import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {User} from './user';
import {MatPaginator} from "@angular/material/paginator";
import {ApiService} from "../shared/api.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserTComponent} from "./user-t/user-t.component";
import {UserTableService} from "../services/user-Table.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit, OnInit {
  users: User[];

  constructor(private apiService: ApiService, private dialog: MatDialog, private service:UserTableService) {
  }

  displayedColumns: string[] = ['uniqueId', 'name', 'role', 'email','edit','delete'];
  dataSource: MatTableDataSource<User[]> = new MatTableDataSource([]) ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void{
    this.apiService.getAllUsers().subscribe(response => {
      this.dataSource = new MatTableDataSource(response['data']['users']);
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

Edit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "90%";
    this.dialog.open(UserTComponent, dialogConfig);
    this.service.populateForm(row.id);
    this.dialog.afterAllClosed.subscribe(result =>{
      this.ngOnInit();
    })
  }

    Ondel(id) {
    this.apiService.deleteUser(id).subscribe();
    this.ngOnInit();
  }

}
