export interface LoginResponsePayload {
  authenticationToken: string;
  expiresAt: Date;
  email: string;
  refreshToken: string;
  message: string;
}
