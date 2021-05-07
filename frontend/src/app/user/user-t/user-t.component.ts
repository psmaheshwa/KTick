import {Component, OnInit} from '@angular/core';
import {UserTableService} from "../../services/user-Table.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-t',
  templateUrl: './user-t.component.html',
  styleUrls: ['./user-t.component.css']
})
export class UserTComponent implements OnInit {

  constructor(public userService: UserTableService) {
  }

  roles = ['admin', 'user'];

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.update();
  }
}
