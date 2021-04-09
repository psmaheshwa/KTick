import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {User} from "../user/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  access_token: string = this.authService.getAccess_token().trim();
  baseUri: string = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // getAllUsers(){
  //   let url = `${this.baseUri}users`;
  //   return this.http.get(url,{
  //     headers:new HttpHeaders().append('Authorization', `Bearer ${this.access_token}`)
  //   }).pipe(catchError(this.errorMgmt));
  // }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUri+'users');
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
