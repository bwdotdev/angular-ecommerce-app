import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(userID: number): User {
    return {
      userID: userID,
      email: ''
    };
  }

  getAll(): User[] {
    return [];
  }

  create(user: User): User {
    return {
      userID: user.userID,
      email: user.email
    };
  }

  update(user: User): User {
    return {
      userID: user.userID,
      email: user.email
    };
  }

  delete(user: User): boolean {
    return true;
  }

}
