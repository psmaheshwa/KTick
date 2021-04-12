import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {ApiService} from "../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor(private apiservice: ApiService) {
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    projectID: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    status: new FormControl({value: 'Open', disabled: true}, Validators.required),
    assignedTo: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: '',
      projectID: '',
      title: '',
      status: 'Open',
      assignedTo: '',
      priority: '',
      dueDate: '',
      description: ''
    });
  }

  createTicket() {
    console.log(this.form.value);
    this.apiservice.createTicket(this.form.value).subscribe();
  }

  deleteTicket(row) {
    this.apiservice.deleteTicket(row).subscribe();
  }

  populateForm(row) {
    this.apiservice.getTicketById(row).subscribe(response => {
      let ticket = response['data'];
      console.log(ticket)
      this.form.setValue({id:'',
        projectID: ticket.projectID['id'],
        title: ticket.id,
        status: 'Open',
        assignedTo: ticket.assignedTo['id'],
        priority: ticket.priority,
        dueDate: ticket.dueDate,
        description: ticket.description});
    });
  }

  updateTicket(id){
    this.populateForm(id);
    this.apiservice.updateTicket(id,this.form.value);
  }

}
