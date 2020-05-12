export interface LoginUserResponsePayload {
  email: string;
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  message: string;
}
