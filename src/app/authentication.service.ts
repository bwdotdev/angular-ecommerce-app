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

  baseUrl: string = 'https://api.bradw.io/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: AuthUser): Promise<User | boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/login', user).subscribe(response => {
        var data: any = response;
        var user: User = data.user;
        localStorage.setItem('LoggedInUser', JSON.stringify(data.user));
        
        resolve(data.user);
      }, error => {
        reject(error);
      });
    });
  }

  register(user: AuthUser): Promise<User | boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/register', user).subscribe(response => {
        var data: any = response;
        var user: User = data;
        localStorage.setItem('LoggedInUser', JSON.stringify(user));
        
        resolve(user);
      }, error => {
        reject(error);
      });
    });
  }

  emailExists(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/check/email/'+ email).subscribe(response => {
        var data: any = response;

        resolve(data.exists || false);
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
    const values = value.split('.');

    let current = this.user();
    values.forEach((val, key) => {
      current = current[val];
    });
    return current || null;
  }

}
