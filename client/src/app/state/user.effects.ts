import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import * as userActions from './user.actions';
import { User } from '../model/user.model';
import { UserRequestPayload } from 'src/app/dto/userRequestPayload';
import { LoginResponsePayload } from '../dto/loginResponsePayload';

@Injectable()
export class UserEffect {
  userRequestPayload: UserRequestPayload;

  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  userSignup$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserSignup>(userActions.UserActionTypes.USER_SIGNUP),
    mergeMap((action: userActions.UserSignup) =>
      this.authService.signup(action.payload).pipe(
        map((user: User) => new userActions.UserSignupSuccess({ user })),
        catchError((error) => of(new userActions.UserSignupFail(error)))
      )
    )
  );

  @Effect()
  userSignin$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserSignin>(userActions.UserActionTypes.USER_SIGNIN),
    mergeMap((action: userActions.UserSignin) =>
      this.authService.signin(action.payload).pipe(
        map((user: User) => new userActions.UserSigninSuccess({ user })),
        catchError((error) => of(new userActions.UserSigninFail(error)))
      )
    )
  );

  // @Effect()
  // userSignout$: Observable<Action> = this.actions$.pipe(
  //   ofType<userActions.UserSignout>(userActions.UserActionTypes.USER_SIGNOUT),
  //   mergeMap((action: userActions.UserSignout) => {
  //     this.authService.signout(action.payload).pipe(
  //       map((user: User) => new userActions.UserSignoutSuccess({ user })),
  //       catchError((error) => of(new userActions.UserSignoutFail(error)))
  //     )
  //   })
  // )

  @Effect()
  userRefreshToken$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserRefreshToken>(
      userActions.UserActionTypes.USER_REFRESHTOKEN
    ),
    mergeMap(() =>
      this.authService.refreshToken().pipe(
        map(
          (loginResponsePayload: LoginResponsePayload) =>
            new userActions.UserRefreshTokenSuccess(loginResponsePayload)
        ),
        catchError((error) => of(new userActions.UserRefreshTokenFail(error)))
      )
    )
  );
}
