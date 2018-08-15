/*This file will check any outgoing http requests and attach the token
from the AuthService to verify the user is logged on with an actual token */
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  /*two arguments, first is type of the request to intercept
  second is next since we want to continue after attaching*/
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*Intercept method returns cal to next.handle */
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      /*Add new header with our token */
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    /*we essentially manipulated an outgoing request and added a header
    and are passing it on with next.handle()*/
    return next.handle(authRequest);
  }
}
