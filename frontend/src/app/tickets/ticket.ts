import {User} from "../user/user";

export interface Ticket {
  id:string
  title: string,
  description: string,
  assignedTo: User,
  createdBy: User,
  createdOn: string,
  lastEditedOn: string,
  priority: string,
  status: string,
  projectID: string,
  dueDate: string,
  comment: string
}


