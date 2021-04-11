import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {ApiService} from "../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor(private apiservice:ApiService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    projectId: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    status: new FormControl({value:'Open', disabled:true},Validators.required),
    assignedTo: new FormControl('',Validators.required),
    priority: new FormControl('',Validators.required),
    dueDate: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  });

  initializeFormGroup(){
    this.form.setValue({
      id:'',
      projectId: '',
      title: '',
      status: 'Open',
      assignedTo: '',
      priority: '',
      dueDate: '',
      description: ''
    });
  }

  createTicket(){
    this.apiservice.createTicket(this.form.value).subscribe();
  }
}
