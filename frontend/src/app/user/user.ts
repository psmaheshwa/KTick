export interface User {
  name: string,
  uniqueId: number,
  role: string,
  email: string
}
export const users: User[] = [
  {uniqueId: 1, name: 'Mahesh', role:'admin', email:'psmaheshwa@gmail.com' },
  {uniqueId: 2, name: 'Ragu', role:'user', email:'Ragu@gmail.com'},
  {uniqueId: 3, name: 'Gokul', role:'admin', email:'Gokul@gmail.com'},
  {uniqueId: 4, name: 'Avinash',role:'admin', email:'Avinash@gmail.com' },
  {uniqueId: 5, name: 'Gowtham', role:'user', email:'Gowtham@gmail.com'},
  {uniqueId: 6, name: 'Kiran', role:'user', email:'Kiran@gmail.com'},
  {uniqueId: 7, name: 'Sanjay', role:'user', email:'Sanjay@gmail.com'},
  {uniqueId: 8, name: 'Surya', role:'user', email:'Surya@gmail.com'},
  {uniqueId: 9, name: 'Raja', role:'user', email:'Raja@gmail.com'},
  {uniqueId: 10, name: 'Ram', role:'user', email:'Ram@gmail.com'},
  {uniqueId: 11, name: 'Ramana', role:'user', email:'Ramana@gmail.com'},

];

