import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);

  }

  addUser(user: User) {
    user.id = this.users.length + 1;
    user.fechaRegistro = new Date();
    this.users.push(user);
    }

  updateUser(updatedUser: User){
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) this.users[index] = updatedUser;
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  
}
