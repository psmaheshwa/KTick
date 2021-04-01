import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KTick';
  loginForm: FormGroup;
  constructor(private apiService: ApiService) {
  }

  submit() {
    this.apiService.getApiData().subscribe(data=>{
      console.log(data);
      if(!data){

      }
    });
  }
}
