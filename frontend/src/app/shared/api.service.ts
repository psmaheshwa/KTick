import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {User} from "../user/user";
import {Ticket} from "../tickets/ticket";
import {Project} from "../project/project";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri: string = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUri + 'users');
  }

  getAllTickets(query: String): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUri + 'tickets/?' + query);
  }

  assigned(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUri + 'tickets/assignedToMe');
  }

  created(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUri + 'tickets/createdByMe');
  }

  loginApi(user: User): Observable<User> {
    return this.http.post<User>(this.baseUri + 'users', user);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUri + 'projects');
  }

  createTicket(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUri+'tickets',project);
  }

  getTicketById(id):Observable<Ticket>{
    return this.http.get<Ticket>(this.baseUri+'tickets/'+id);
  }

  deleteTicket(id):Observable<Ticket>{
    return this.http.delete<Ticket>(this.baseUri+'tickets/'+id);
  }

  updateTicket(id, ticket:Ticket):Observable<Ticket>{
    return this.http.patch<Ticket>(this.baseUri+'tickets/'+id,ticket);
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
