export interface User {
  email: string;
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  message: string;
}
