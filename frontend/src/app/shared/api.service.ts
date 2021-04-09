import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  access_token: string = this.authService.getAccess_token();
  baseUri: string = 'http://localhost:3000/api/v1/';
  headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.access_token}`
  })

  constructor(private http: HttpClient, private authService: AuthService) {
  }



}
