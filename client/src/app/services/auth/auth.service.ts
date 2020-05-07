import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRequestPayload } from 'src/app/dto/userRequestPayload';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponsePayload } from '../../dto/loginResponsePayload';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import * as userActions from '../../state/user.actions';
import * as fromUser from '../../state/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private store: Store
  ) {}

  signup(userRequestPayload: UserRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/v1/auth/register',
      userRequestPayload
    );
  }

  signin(userRequestPayload: UserRequestPayload): Observable<any> {
    return this.httpClient
      .post<LoginResponsePayload>(
        'http://localhost:3000/api/v1/auth/login',
        userRequestPayload
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('email', data.email);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);

          return data;
        })
      );
  }

  signout(userRequestPayload: UserRequestPayload): void {
    console.log('signout', userRequestPayload);
  }

  refreshToken() {
    console.log('refreshtoken is fired');

    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      email: this.getEmail(),
    };
    console.log(refreshTokenPayload);
    return this.httpClient
      .post<LoginResponsePayload>(
        'http://localhost:3000/api/v1/auth/refresh',
        refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          console.log(response);
          this.localStorage.store(
            'authorizationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  getEmail(): string {
    return this.localStorage.retrieve('email');
  }

  getRefreshToken(): string {
    return this.localStorage.retrieve('refreshToken');
  }

  getJwtToken(): string {
    return this.localStorage.retrieve('authenticationToken');
  }

  getExpiresAt(): Date {
    return this.localStorage.retrieve('expiresAt');
  }

  public isAuthenticated(): Boolean {
    const jwtToken: any | null = this.getJwtToken();
    console.log(jwtToken);
    if (this.helper.isTokenExpired(jwtToken)) {
      console.log(this.helper.isTokenExpired(jwtToken));
      console.log('jwtexpired');
      try {
        this.store.dispatch(new userActions.UserRefreshToken());
        console.log('refreshtoken');
        return true;
      } catch {
        (error) => console.log(error);
      }
    }
    return true;
  }
}
