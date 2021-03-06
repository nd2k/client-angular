import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRequestPayload } from 'src/app/shared/dto/userRequestPayload';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponsePayload } from '../../dto/loginResponsePayload';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import * as userActions from '../../state/user.actions';
import { LogoutUserRequestPayload } from 'src/app/shared/dto/logoutUserRequestPayload';
import { RegisterUserRequestPayload } from '../../dto/registerUserRequestPayload';
import { LoginUserRequestPayload } from '../../dto/loginUserRequestPayload';
import { EmailValidationRequestPayload } from '../../dto/emailValidationRequestPayload';
import { EmailValidationResponsePaylaod } from '../../dto/emailValidationResponsePayload';

/**
 * @AuthService
 * Service used to authenticate a user
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private store: Store
  ) {}

  /**
   * @SignUp method
   * @param userRequestPayload
   * @returns the user's information in case of success or an error messge in case of failure
   */
  public signup(
    registerUserPayload: RegisterUserRequestPayload
  ): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/v1/auth/register',
      registerUserPayload
    );
  }

  /**
   * @SignIn method
   * @param userRequestPayload
   * @returns the user's information in case of success and store it in the localstorage or an error messge in case of failure
   */
  public signin(
    loginUserRequestPayload: LoginUserRequestPayload
  ): Observable<any> {
    return this.httpClient
      .post<LoginResponsePayload>(
        'http://localhost:3000/api/v1/auth/login',
        loginUserRequestPayload
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

  /**
   * @SignOut method
   * @param userRequestPayload
   * @returns deletion of data from localstorage
   */
  public signout(
    logoutUserRequestPayload: LogoutUserRequestPayload
  ): Observable<any> {
    return this.httpClient
      .post(
        'http://localhost:3000/api/v1/auth/logout',
        logoutUserRequestPayload
      )
      .pipe(
        map((data) => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('email');
          this.localStorage.clear('refreshToken');
          this.localStorage.clear('expiresAt');

          return data;
        })
      );
  }

  /**
   * @RefreshToken method
   * @returns the user's information in case of success or redirect to home page in case of failure
   */
  public refreshToken(): Observable<any> {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      email: this.getEmail(),
    };
    return this.httpClient
      .post<LoginResponsePayload>(
        'http://localhost:3000/api/v1/auth/refresh',
        refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  /**
   * @EmailValidation method
   * @param emailValidationRequestPayload
   * @returns a confirmation about the email address
   */

  /**
   * @GetEmail method
   * @returns email string
   */
  public getEmail(): string {
    return this.localStorage.retrieve('email');
  }

  /**
   * @GetRefreshToken method
   * @returns refreshToken string
   */
  public getRefreshToken(): string {
    return this.localStorage.retrieve('refreshToken');
  }

  /**
   * @GetAuthenticationToken method
   * @returns authenticationToken string
   */
  public getAuthenticationToken(): string {
    return this.localStorage.retrieve('authenticationToken');
  }

  /**
   * @GetExpiresAt method
   * @returns expiresAt date
   */
  public getExpiresAt(): Date {
    return this.localStorage.retrieve('expiresAt');
  }

  /**
   * @IsAuthenticated method
   * @returns a boolean value
   */
  public getIsAuthenticated(): Boolean {
    const jwtToken: any | null = this.getAuthenticationToken();

    if (this.helper.isTokenExpired(jwtToken)) {
      try {
        this.store.dispatch(new userActions.UserRefreshToken());
        return this.isAuthenticated;
      } catch {
        (error: Error) => {
          console.log(error);
        };
      }
    }
    this.store.dispatch(new userActions.UserAuthenticate());
    return true;
  }
}
