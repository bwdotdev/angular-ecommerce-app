import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user';
import { AuthUser } from './auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = 'https://api.bradw.io';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: AuthUser): Promise<User | boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/auth/login', user).subscribe(response => {
        var data: any = response;
        var user: User = data.user;
        localStorage.setItem('LoggedInUser', JSON.stringify(data.user));
        
        resolve(data.user);
      }, error => {
        reject(error);
      });
    });
  }

  logout(): void {
    localStorage.removeItem('LoggedInUser');
    this.router.navigateByUrl('login');
  }

  loggedIn(): boolean {
    return localStorage.getItem('LoggedInUser') ? true : false;
  }

  user(): User {
    return JSON.parse(localStorage.getItem('LoggedInUser'));
  }

  userProp(value: string): any {
    return JSON.parse(localStorage.getItem('LoggedInUser'))[value] || null;
  }

}
