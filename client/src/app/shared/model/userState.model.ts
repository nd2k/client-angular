import { User } from './user.model';
import { Error } from './error.model';

export interface UserState {
  user: User;
  isAuthenticated: boolean;
  isActive: boolean;
  isSignup: boolean;
  isSignin: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  isTokenRefreshed: boolean;
  error: Error;
}
