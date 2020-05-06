import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { ErrorResponsePayload } from '../dto/errorResponsePayload';
import { UserRequestPayload } from '../dto/userRequestPayload';

export enum UserActionTypes {
  USER_SIGNUP = '[User] signup user',
  USER_SIGNUP_SUCCESS = '[User] signup user success',
  USER_SIGNUP_FAIL = '[User] signup user fail',
  USER_SIGNIN = '[User] signin user',
  USER_SIGNIN_SUCCESS = '[User] signin user success',
  USER_SIGNIN_FAIL = '[User] signin user fail',
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

export type UserAction =
  | UserSignin
  | UserSigninSuccess
  | UserSigninFail
  | UserSignup
  | UserSignupSuccess
  | UserSignupFail;
