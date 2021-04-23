import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../shared/api.service";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class UserTableService {

  constructor(private apiservice: ApiService, private dialog:MatDialog) { }

  form: FormGroup = new FormGroup({
    id: new FormControl({value: ''}),
    name: new FormControl({value: '', disabled: true}),
    role: new FormControl(''),
    email: new FormControl({value: '', disabled: true}),
    uniqueId: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      id: '',
      name:'',
      role:'',
      email:'',
      uniqueId:''
    });
  }

  populateForm(row) {
    this.apiservice.getUserById(row).subscribe(response => {
      let user = response['data'];
      console.log(user)
      this.form.setValue({
        id:user.id,
        name:user.name,
        role:user.role,
        email:user.email,
        uniqueId:user.uniqueId
        });
    });
  }

  updateUser(id) {
    this.apiservice.updateUser(id,this.form.value).subscribe();
  }

  update() {
    console.log(this.form.value.id)
    if(this.form.value.id)
      this.updateUser(this.form.value.id);
    this.dialog.closeAll();
    location.reload();
  }
}
