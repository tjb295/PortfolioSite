import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private token: string;
  private isAuthenticated = false;

  /*Make listener to send if the user is authenticated or not */
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signup(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http.post<{token: string}>('/api/user/signup', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      /*Make sure we actually received a token*/
      if (token) {
        console.log(this.token);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/console']);
      }
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{token: string}>('/api/user/login', authData)
    .subscribe(response => {
      this.token = response.token;
      console.log(response);
      console.log(this.token);
      if (this.token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/console']);
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    /*pass information to all intersted parties */
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
