export interface RegisterUserResponsePayload {
  email: string;
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  message: string;
}
