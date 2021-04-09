import { Component, OnInit } from '@angular/core';
import { CreateTicketService } from '../../services/create-ticket.service';


@Component({
  selector: 'app-create-ticket-form',
  templateUrl: './create-ticket-form.component.html',
  styleUrls: ['./create-ticket-form.component.css']
})
export class CreateTicketFormComponent implements OnInit {

  constructor(public createTicketService:CreateTicketService) { }

  ngOnInit(): void {
  }

  status = [
    {id: 0,value: "open"},
    {id: 1,value: "closed"}
  ];

  priority = [
    {id:0,value: "low"},
    {id:1,value: "medium"},
    {id:2,value: "high"}
  ];

  onClear(){
    this.createTicketService.form.reset();
    this.createTicketService.initializeFormGroup();
  }

  

}
