import * as userActions from './user.actions';
import { User } from '../model/user.model';
import { ErrorResponsePayload } from '../dto/errorResponsePayload';
import * as fromRoot from './app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
  user: User;
  isAuthenticated: boolean;
  isActive: boolean;
  isSignup: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  error: ErrorResponsePayload;
}

export interface AppState extends fromRoot.AppState {
  user: UserState;
}

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isActive: false,
  isSignup: false,
  isLoading: false,
  isLoaded: false,
  error: null,
};

export function userReducer(
  state = initialState,
  action: userActions.UserAction
): UserState {
  switch (action.type) {
    case userActions.UserActionTypes.USER_SIGNUP: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case userActions.UserActionTypes.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isSignup: true,
        user: {
          email: action.payload.user.email,
          authenticationToken: action.payload.user.authenticationToken,
          refreshToken: action.payload.user.refreshToken,
          expiresAt: action.payload.user.expiresAt,
          message: action.payload.user.message,
        },
      };
    }
    case userActions.UserActionTypes.USER_SIGNUP_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isSignup: false,
        error: {
          errorCode: action.payload.error.errorCode,
          errorMessage: action.payload.error.errorMessage,
          httpStatus: action.payload.error.httpStatus,
        },
      };
    }
    case userActions.UserActionTypes.USER_SIGNIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case userActions.UserActionTypes.USER_SIGNIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isSignup: false,
        isAuthenticated: true,
        isActive: true,
        user: {
          email: action.payload.user.email,
          authenticationToken: action.payload.user.authenticationToken,
          refreshToken: action.payload.user.refreshToken,
          expiresAt: action.payload.user.expiresAt,
          message: action.payload.user.message,
        },
      };
    }
    case userActions.UserActionTypes.USER_SIGNIN_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: {
          errorCode: action.payload.error.errorCode,
          errorMessage: action.payload.error.errorMessage,
          httpStatus: action.payload.error.httpStatus,
        },
      };
    }
    default: {
      return state;
    }
  }
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  getUserFeatureState,
  (state: UserState) => state.user
);

export const getIsAuthenticated = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isAuthenticated
);

export const getIsLoaded = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isLoaded
);

export const getIsLoading = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isLoading
);

export const getIsSignup = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isSignup
);

export const getIsActive = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isActive
);

export const getError = createSelector(
  getUserFeatureState,
  (state: UserState) => state.error
);
