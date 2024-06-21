// next
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";

// The cookie maxage must match the token expiration (maxage is in seconds)
const ACCESS_TOKEN_MAXAGE = 60 * 15;
const REFRESH_TOKEN_MAXAGE = 60 * 60 * 24 * 7;

export const ACCESS_TOKEN_EXPIRES = `${ACCESS_TOKEN_MAXAGE}s`;
export const REFRESH_TOKEN_EXPIRES = `${REFRESH_TOKEN_MAXAGE}s`;

// The cookie settings may vary based on whether in development or production mode
export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  maxAge: ACCESS_TOKEN_MAXAGE,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
} satisfies Partial<ResponseCookie>;

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  maxAge: REFRESH_TOKEN_MAXAGE,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
} satisfies Partial<ResponseCookie>;
