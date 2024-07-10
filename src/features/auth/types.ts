// other libraries
import { JWTPayload } from "jose";

// types
export interface Credentials {
  username: string;
  password: string;
}

// The access token will contain additional information about the user, eliminating the need to query the database
export interface AccessTokenPayload extends JWTPayload {
  email: string;
  username: string;
  role: string;
}

// The refresh token will contain only the information required to find the user in the database
export interface RefreshTokenPayload extends JWTPayload {
  userId: string;
}
