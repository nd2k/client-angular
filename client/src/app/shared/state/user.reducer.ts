import * as userActions from './user.actions';
import * as fromRoot from './app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../model/userState.model';

export interface AppState extends fromRoot.AppState {
  user: UserState;
}

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isActive: false,
  isSignup: false,
  isSignin: false,
  isLoading: false,
  isLoaded: false,
  isTokenRefreshed: false,
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
          email: action.payload.email,
          authenticationToken: action.payload.authenticationToken,
          refreshToken: action.payload.refreshToken,
          expiresAt: action.payload.expiresAt,
          message: action.payload.message,
        },
        error: null,
      };
    }
    case userActions.UserActionTypes.USER_SIGNUP_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isSignup: false,
        user: null,
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
        isSignin: true,
        isAuthenticated: true,
        isActive: true,
        isTokenRefreshed: false,
        user: {
          email: action.payload.email,
          authenticationToken: action.payload.authenticationToken,
          refreshToken: action.payload.refreshToken,
          expiresAt: action.payload.expiresAt,
          message: action.payload.message,
        },
        error: null,
      };
    }
    case userActions.UserActionTypes.USER_SIGNIN_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isTokenRefreshed: false,
        user: null,
        error: {
          errorCode: action.payload.error.errorCode,
          errorMessage: action.payload.error.errorMessage,
          httpStatus: action.payload.error.httpStatus,
        },
      };
    }
    case userActions.UserActionTypes.USER_SIGNOUT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case userActions.UserActionTypes.USER_SIGNOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isSignup: false,
        isSignin: false,
        isAuthenticated: false,
        isActive: false,
        user: null,
        error: null,
      };
    }
    case userActions.UserActionTypes.USER_SIGNOUT_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        user: null,
        error: {
          errorCode: action.payload.error.errorCode,
          errorMessage: action.payload.error.errorMessage,
          httpStatus: action.payload.error.httpStatus,
        },
      };
    }
    case userActions.UserActionTypes.USER_REFRESHTOKEN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case userActions.UserActionTypes.USER_REFRESHTOKEN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isSignup: false,
        isAuthenticated: true,
        isActive: true,
        isTokenRefreshed: true,
        user: {
          email: action.payload.email,
          authenticationToken: action.payload.authenticationToken,
          refreshToken: action.payload.refreshToken,
          expiresAt: action.payload.expiresAt,
          message: action.payload.message,
        },
        error: null,
      };
    }
    case userActions.UserActionTypes.USER_REFRESHTOKEN_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isAuthenticated: false,
        isTokenRefreshed: true,
        user: null,
        error: {
          errorCode: action.payload.error.errorCode,
          errorMessage: action.payload.error.errorMessage,
          httpStatus: action.payload.error.httpStatus,
        },
      };
    }
    case userActions.UserActionTypes.USER_AUTHENTICATE: {
      return {
        ...state,
        isAuthenticated: true,
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

export const getIsSignin = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isSignin
);

export const getIsActive = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isActive
);

export const getTokenRefreshed = createSelector(
  getUserFeatureState,
  (state: UserState) => state.isTokenRefreshed
);

export const getError = createSelector(
  getUserFeatureState,
  (state: UserState) => state.error
);
