import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: String, password: String): User|false {
    if(email !== 'mail@bradleyw.me' || password !== 'password') return false;

    return {
      userID: 1,
      email: email
    };
  }

}
