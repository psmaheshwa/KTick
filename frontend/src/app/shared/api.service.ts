import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

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

  getAllUsers(){
    let url = `${this.baseUri}/users`;
    return this.http.get(url,{
      headers:new HttpHeaders().append('Content-Type','application/json').append('Authorization', `Bearer ${this.access_token}`)
    }).pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
