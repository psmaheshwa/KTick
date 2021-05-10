import {Component, OnInit} from '@angular/core';
import {CreateTicketService} from '../../services/create-ticket.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ApiService} from "../../shared/api.service";
import {Project} from "../../project/project";
import {User} from "../../user/user";
import {AuthService} from "../../shared/auth.service";



@Component({
  selector: 'app-create-ticket-form',
  templateUrl: './create-ticket-form.component.html',
  styleUrls: ['./create-ticket-form.component.css']
})
export class CreateTicketFormComponent implements OnInit {

  constructor(
    public createTicketService: CreateTicketService,
    private dialog: MatDialogRef<CreateTicketFormComponent>,
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  loggedInUser = this.authService.getUserID();
  status = ['Open', 'In Process', 'Close'];
  defaultStatus = "Open";
  priorities = ['Low', 'Medium', 'High'];
  projects: Project[];
  users: User[];


  ngOnInit(): void {
    this.apiService.getProjects().subscribe(response => {
      this.projects = response['data']['projects'];
    });
    this.apiService.getAllUsers().subscribe(response => {
      this.users = response['data']['users'];
    });
  }

  onClear() {
    this.createTicketService.form.reset();
    this.createTicketService.initializeFormGroup();
  }

  onSubmit() {
    if(this.createTicketService.form.value.id){
      this.createTicketService.updateTicket(this.createTicketService.form.value.id)
    }else{
      this.createTicketService.createTicket();
    }
      this.dialog.close();
  }

  onClose() {
    this.dialog.close();
  }
}
