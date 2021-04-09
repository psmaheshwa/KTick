import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    project: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    assignTo: new FormControl('',Validators.required),
    priority: new FormControl('',Validators.required),
    dueDate: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      project: '',
      title: '',
      status: '',
      assignTo: '',
      priority: '',
      dueDate: '',
      description: ''
    })
  }
}
