import { Component, OnInit } from '@angular/core';
import { CreateTicketService } from '../../services/create-ticket.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-ticket-form',
  templateUrl: './create-ticket-form.component.html',
  styleUrls: ['./create-ticket-form.component.css']
})
export class CreateTicketFormComponent implements OnInit {

  constructor(
    public createTicketService:CreateTicketService,
    private _location : Location
    ) { }

  ngOnInit(): void {
  }

  status = [
    {id: 0,value: "open"},
    {id: 1,value: "closed"}
  ];

  defaultStatus = "open";

  priority = [
    {id:0,value: "low"},
    {id:1,value: "medium"},
    {id:2,value: "high"}
  ];

  projects = [
    {id:0,value:"Billing"},
    {id:1,value:"IT"},
    {id:2,value:"Accounts"},
    {id:3,value:"Sales"},
    {id:4,value:"Finance"},
    {id:5,value:"HR"},
    {id:6,value:"Marketing"},
  ]

  onClear(){
    this.createTicketService.form.reset();
    this.createTicketService.initializeFormGroup();
  }

  back(){
    this._location.back();
  }

  

}
