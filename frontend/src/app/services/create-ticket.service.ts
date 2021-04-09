import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    owner: new FormControl('',Validators.required),
    priority: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      title: '',
      status: '',
      owner: '',
      priority: '',
      description: ''
    })
  }
}
