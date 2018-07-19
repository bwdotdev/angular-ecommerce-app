import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';
import { AuthUser } from './auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = 'https://api.bradw.io';

  constructor(private http: HttpClient) { }

  login(user: AuthUser): Promise<User | boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/auth/login', user).subscribe(response => {
        var data: any = response;
        var user: User = data.user;
        localStorage.setItem('LoggedInUser', JSON.stringify(data.user));
        
        resolve(data.user);
      });
    });
  }

  loggedIn(): boolean {
    return localStorage.getItem('LoggedInUser') ? true : false;
  }

  user(): User {
    return JSON.parse(localStorage.getItem('LoggedInUser'));
  }

}
