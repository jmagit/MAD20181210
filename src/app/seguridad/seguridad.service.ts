import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuth = true;
  private authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU0NDY5NDYzNH0.8rwGOONC_WFitwPznnG2_LdWBJCejO8aBhoy0SrtKxU';
  private name = 'admin';
  constructor() {
    if (localStorage && localStorage.AuthService) {
      const rslt = JSON.parse(localStorage.AuthService);
      this.isAuth = rslt.isAuth;
      this.authToken = rslt.authToken;
      this.name = rslt.name;
    }
  }
  get AuthorizationHeader() {
    return this.authToken;
  }
  get isAutenticated() {
    return this.isAuth;
  }
  get Name() {
    return this.name;
  }
  login(authToken: string, name: string) {
    this.isAuth = true;
    this.authToken = authToken;
    this.name = name;
    if (localStorage) {
      localStorage.AuthService = JSON.stringify({ isAuth: this.isAuth, authToken, name });
    }
  }
  logout() {
    this.isAuth = false;
    this.authToken = '';
    this.name = '';
    if (localStorage) {
      localStorage.removeItem('AuthService');
    }
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.withCredentials || ! this.auth.isAutenticated) {
      return next.handle(req);
    }
    const authReq = req.clone(
      { headers: req.headers.set('Authorization', this.auth.AuthorizationHeader) });
    return next.handle(authReq);
  }
}
