import {Component, OnInit} from '@angular/core';
import {CreateTicketService} from '../../services/create-ticket.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ApiService} from "../../shared/api.service";
import {Project} from "../../project/project";
import {User} from "../../user/user";


@Component({
  selector: 'app-create-ticket-form',
  templateUrl: './create-ticket-form.component.html',
  styleUrls: ['./create-ticket-form.component.css']
})
export class CreateTicketFormComponent implements OnInit {

  constructor(
    public createTicketService: CreateTicketService,
    private dialog: MatDialogRef<CreateTicketFormComponent>,
    private apiService: ApiService
  ) {
  }

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
      this.createTicketService.createTicket();
      this.dialog.close();
      this.createTicketService.form.reset();
      this.createTicketService.initializeFormGroup();
      this.onClose();
  }

  onClose() {
    this.createTicketService.form.reset();
    this.createTicketService.initializeFormGroup();
    this.dialog.close();
  }
}
