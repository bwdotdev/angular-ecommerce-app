import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = 'https://api.bradw.io';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): User|false {
    this.http.post(this.baseUrl + '/auth/login', {
      username: email,
      password: password
    }).subscribe(data => {
      console.log(data);
    });

    return {
      userID: 1,
      email: email
    };
  }

}
