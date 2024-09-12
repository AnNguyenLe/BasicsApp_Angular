export interface AuthenticationResponse {
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  expiryOfAccessToken: Date;
  refreshToken: string;
}
