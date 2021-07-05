import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenStorageService} from "../service/token-storage.service";
import { Observable } from "rxjs";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authRequest = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)});
    }
    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
]
