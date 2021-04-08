import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {User} from './user';
import {MatPaginator} from "@angular/material/paginator";


const users: User[] = [
  {uniqueId: 1, name: 'Mahesh', role:'admin', email:'psmaheshwa@gmail.com' },
  {uniqueId: 2, name: 'Ragu', role:'user', email:'Ragu@gmail.com'},
  {uniqueId: 3, name: 'Gokul', role:'admin', email:'Gokul@gmail.com'},
  {uniqueId: 4, name: 'Avinash',role:'admin', email:'Avinash@gmail.com' },
  {uniqueId: 5, name: 'Gowtham', role:'user', email:'Gowtham@gmail.com'},
  {uniqueId: 6, name: 'Kiran', role:'user', email:'Kiran@gmail.com'},
  {uniqueId: 7, name: 'Sanjay', role:'user', email:'Sanjay@gmail.com'},
  {uniqueId: 8, name: 'Surya', role:'user', email:'Surya@gmail.com'},
  {uniqueId: 9, name: 'Raja', role:'user', email:'Raja@gmail.com'},
  {uniqueId: 10, name: 'Ram', role:'user', email:'Ram@gmail.com'},
  {uniqueId: 11, name: 'Ramana', role:'user', email:'Ramana@gmail.com'},

];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {

  constructor() {
  }

  displayedColumns: string[] = ['uniqueId', 'name', 'role', 'email'];
  dataSource = new MatTableDataSource(users);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

}
