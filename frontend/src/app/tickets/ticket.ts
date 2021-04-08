import {User} from "../user/user";
import {users} from "../user/user";

export interface Ticket {
  title: string,
  description: string,
  assignedTo: string,
  createdBy: string,
  createdOn: string,
  lastEditedOn: string,
  priority: string,
  status: string,
  projectID: string,
  dueDate: string
}


export const creeated: Ticket[] = [
  {
    title: 'Ticket 1',
    description: 'Ticket 1 descrption',
    assignedTo: users[2].name,
    createdBy: users[1].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 2',
    description: 'Ticket 2 descrption',
    assignedTo: users[3].name,
    createdBy: users[1].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 3',
    description: 'Ticket 3 descrption',
    assignedTo: users[4].name,
    createdBy: users[1].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 4',
    description: 'Ticket 5 descrption',
    assignedTo: users[5].name,
    createdBy: users[1].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 5',
    description: 'Ticket 5 descrption',
    assignedTo: users[5].name,
    createdBy: users[1].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 6',
    description: 'Ticket 6 descrption',
    assignedTo: users[6].name,
    createdBy: users[1].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 7',
    description: 'Ticket 7 descrption',
    assignedTo: users[7].name,
    createdBy: users[1].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },

];
export const assigned: Ticket[] = [
  {
    title: 'Ticket 1',
    description: 'Ticket 1 descrption',
    assignedTo: users[1].name,
    createdBy: users[3].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 2',
    description: 'Ticket 2 descrption',
    assignedTo: users[0].name,
    createdBy: users[2].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 3',
    description: 'Ticket 3 descrption',
    assignedTo: users[0].name,
    createdBy: users[3].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 4',
    description: 'Ticket 4 descrption',
    assignedTo: users[0].name,
    createdBy: users[3].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 5',
    description: 'Ticket 5 descrption',
    assignedTo: users[0].name,
    createdBy: users[5].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 6',
    description: 'Ticket 6 descrption',
    assignedTo: users[0].name,
    createdBy: users[7].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
  {
    title: 'Ticket 7',
    description: 'Ticket 7 descrption',
    assignedTo: users[0].name,
    createdBy: users[6].name,
    createdOn: '20-01-2021',
    dueDate: '21-01-2021',
    lastEditedOn: '20-01-2021',
    priority: 'high',
    status: 'open',
    projectID: '123456'
  },
];
