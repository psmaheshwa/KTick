import {User} from "../user/user";
import {users} from "../user/user";

export interface Ticket {
  title: string,
  description: string,
  assignedTo: User,
  createdBy: User,
  createdOn: string,
  lastEditedOn: string,
  priority: string,
  status: string,
  projectID: string,
  dueDate: string
}


