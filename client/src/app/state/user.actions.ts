import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { ErrorResponsePayload } from '../dto/errorResponsePayload';
import { UserRequestPayload } from '../dto/userRequestPayload';
import { LoginResponsePayload } from '../dto/loginResponsePayload';
import { LogoutRequestPayload } from '../dto/logoutRequestPayload';

export enum UserActionTypes {
  USER_SIGNUP = '[User] signup user',
  USER_SIGNUP_SUCCESS = '[User] signup user success',
  USER_SIGNUP_FAIL = '[User] signup user fail',
  USER_SIGNIN = '[User] signin user',
  USER_SIGNIN_SUCCESS = '[User] signin user success',
  USER_SIGNIN_FAIL = '[User] signin user fail',
  USER_SIGNOUT = '[User] singout user',
  USER_SIGNOUT_SUCCESS = '[User] singout user success',
  USER_SIGNOUT_FAIL = '[User] singout user fail',
  USER_REFRESHTOKEN = '[User] refreshToken user',
  USER_REFRESHTOKEN_SUCCESS = '[User] refreshToken user success',
  USER_REFRESHTOKEN_FAIL = '[User] refreshToken user fail',
  USER_AUTHENTICATE = '[User] authenticate user from jwt',
}

export class UserSignup implements Action {
  readonly type = UserActionTypes.USER_SIGNUP;

  constructor(public payload: UserRequestPayload) {}
}

export class UserSignupSuccess implements Action {
  readonly type = UserActionTypes.USER_SIGNUP_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export class UserSignupFail implements Action {
  readonly type = UserActionTypes.USER_SIGNUP_FAIL;

  constructor(public payload: { error: ErrorResponsePayload }) {}
}

export class UserSignin implements Action {
  readonly type = UserActionTypes.USER_SIGNIN;

  constructor(public payload: UserRequestPayload) {}
}

export class UserSigninSuccess implements Action {
  readonly type = UserActionTypes.USER_SIGNIN_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export class UserSigninFail implements Action {
  readonly type = UserActionTypes.USER_SIGNIN_FAIL;

  constructor(public payload: { error: ErrorResponsePayload }) {}
}

export class UserSignout implements Action {
  readonly type = UserActionTypes.USER_SIGNOUT;

  constructor(public payload: LogoutRequestPayload) {}
}

export class UserSignoutSuccess implements Action {
  readonly type = UserActionTypes.USER_SIGNOUT_SUCCESS;

  constructor() {}
}

export class UserSignoutFail implements Action {
  readonly type = UserActionTypes.USER_SIGNOUT_FAIL;

  constructor(public payload: { error: ErrorResponsePayload }) {}
}

export class UserRefreshToken implements Action {
  readonly type = UserActionTypes.USER_REFRESHTOKEN;

  constructor() {}
}

export class UserRefreshTokenSuccess implements Action {
  readonly type = UserActionTypes.USER_REFRESHTOKEN_SUCCESS;

  constructor(public payload: LoginResponsePayload) {}
}

export class UserRefreshTokenFail implements Action {
  readonly type = UserActionTypes.USER_REFRESHTOKEN_FAIL;

  constructor(public payload: { error: ErrorResponsePayload }) {}
}

export class UserAuthenticate implements Action {
  readonly type = UserActionTypes.USER_AUTHENTICATE;

  constructor() {}
}

export type UserAction =
  | UserSignin
  | UserSigninSuccess
  | UserSigninFail
  | UserSignup
  | UserSignupSuccess
  | UserSignupFail
  | UserSignout
  | UserSignoutSuccess
  | UserSignoutFail
  | UserRefreshToken
  | UserRefreshTokenSuccess
  | UserRefreshTokenFail
  | UserAuthenticate;
