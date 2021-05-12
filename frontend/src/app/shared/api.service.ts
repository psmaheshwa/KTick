import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../user/user";
import {Ticket} from "../tickets/ticket";
import {Project} from "../project/project";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri: string = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient, private notificationService: NotificationService) {
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
    this.notificationService.notify('Welcome '+user.name);
    return this.http.post<User>(this.baseUri + 'users', user);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUri + 'projects');
  }

  createTicket(project: Project): Observable<Project> {
    this.notificationService.notify('Ticket Created Successfully');
    return this.http.post<Project>(this.baseUri + 'tickets', project);
  }

  getTicketById(id): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUri + 'tickets/' + id);
  }

  deleteTicket(id): Observable<Ticket> {
    this.notificationService.notify('Ticket Deleted');
    return this.http.delete<Ticket>(this.baseUri + 'tickets/' + id);
  }

  updateTicket(id, ticket: Ticket): Observable<Ticket> {
    this.notificationService.notify('Ticket Updated');
    return this.http.patch<Ticket>(this.baseUri + 'tickets/' + id, ticket);
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

  getUserById(id): Observable<User> {
    return this.http.get<User>(this.baseUri + 'users/' + id);
  }

  updateUser(id, user: User): Observable<User> {
    this.notificationService.notify('User Updated Successfully');
    return this.http.patch<User>(this.baseUri + 'users/' + id, user);
  }

  deleteUser(id): Observable<User> {
    this.notificationService.notify('User Deleted Successfully');
    return this.http.delete<User>(this.baseUri + 'users/' + id);
  }

  totalResolved(): Observable<number> {
    return this.http.get<number>(this.baseUri + 'tickets/totalClosed');
  }

  totalOpened(): Observable<number> {
    return this.http.get<number>(this.baseUri + 'tickets/totalOpened');
  }

  totalHigh(): Observable<number> {
    return this.http.get<number>(this.baseUri + 'tickets/totalHigh');
  }

  totalDueExceeded(): Observable<number> {
    return this.http.get<number>(this.baseUri + 'tickets/dueExceed');
  }

  totalToday(): Observable<number> {
    return this.http.get<number>(this.baseUri + 'tickets/totalToday');
  }

  totalMedium(): Observable<number> {
    return this.http.get<number>(this.baseUri + 'tickets/totalMedium');
  }

  totalLow(): Observable<number> {
    return this.http.get<number>(this.baseUri + 'tickets/totalLow');
  }

  totalAssigned(): Observable<number> {
    return this.http.get<number>(this.baseUri + 'tickets/totalAssigned');
  }

  weekChart(): Observable<any> {
    return this.http.get<any>(this.baseUri+'tickets/weekChart')
  }

}
