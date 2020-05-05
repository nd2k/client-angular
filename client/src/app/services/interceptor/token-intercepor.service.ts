import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap, catchError } from 'rxjs/operators';
import { LoginResponsePayload } from 'src/app/dto/loginResponsePayload';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceporService implements HttpInterceptor {
  isTokenRefreshing: Boolean = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      this.addTokenInHeader(req, this.authService.getJwtToken);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handleAuthErrors(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addTokenInHeader(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
    });
  }

  private handleAuthErrors(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponsePayload) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(
            refreshTokenResponse.authenticationToken
          );
          return next.handle(
            this.addTokenInHeader(req, refreshTokenResponse.authenticationToken)
          );
        })
      );
    }
  }
}
