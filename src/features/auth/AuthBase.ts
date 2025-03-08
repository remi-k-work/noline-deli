// next
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// other libraries
import { nanoid } from "nanoid";
import { SignJWT, jwtVerify } from "jose";
import * as consts from "./consts";
import { AccessTokenPayload, RefreshTokenPayload } from "./types";

export class AuthError extends Error {
  constructor(
    message: string,

    // The default auth error status code is "400 bad request"
    public readonly statusCode: number = 400,
  ) {
    super(message);
  }
}

export default class AuthBase {
  private accessToken?: string;
  private refreshToken?: string;

  constructor(private res?: NextResponse) {}

  protected async getAccessToken(): Promise<string | undefined> {
    if (!this.accessToken) this.accessToken = (await cookies()).get(consts.ACCESS_TOKEN_COOKIE)?.value;
    return this.accessToken;
  }

  private async getRefreshToken(): Promise<string | undefined> {
    if (!this.refreshToken) this.refreshToken = (await cookies()).get(consts.REFRESH_TOKEN_COOKIE)?.value;
    return this.refreshToken;
  }

  // Verifies the current access token and returns its payload if it is valid
  protected async verifyAccessToken() {
    // We anticipate the access token cookie to be included with the request
    if (!(await this.getAccessToken())) throw new AuthError("Unauthorized", 401);

    try {
      const verifiedAccessToken = await jwtVerify((await this.getAccessToken())!, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
      return verifiedAccessToken.payload as AccessTokenPayload;
    } catch (error) {
      // Invalid access token
      throw new AuthError("Forbidden", 403);
    }
  }

  // Verifies the current refresh token and returns its payload if it is valid
  protected async verifyRefreshToken() {
    // We anticipate the refresh token cookie to be included with the request
    if (!(await this.getRefreshToken())) throw new AuthError("Unauthorized", 401);

    try {
      const verifiedRefreshToken = await jwtVerify((await this.getRefreshToken())!, new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET));
      return verifiedRefreshToken.payload as RefreshTokenPayload;
    } catch (error) {
      // Invalid refresh token
      throw new AuthError("Forbidden", 403);
    }
  }

  // Create a short-lived access token that will be held in memory and returned to the client
  protected async createAndStoreAccessToken(accessTokenPayload: AccessTokenPayload) {
    this.accessToken = await new SignJWT(accessTokenPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(consts.ACCESS_TOKEN_EXPIRES)
      .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));

    // Create secure cookies to hold both tokens, which are only accessible by the server
    if (this.res) {
      // Add the cookie to the response when executed in the middleware
      this.res.cookies.set(consts.ACCESS_TOKEN_COOKIE, this.accessToken, consts.ACCESS_TOKEN_COOKIE_OPTIONS);
    } else {
      // Cookies can only be modified in a server action or route handler (this will not work in middleware)
      (await cookies()).set(consts.ACCESS_TOKEN_COOKIE, this.accessToken, consts.ACCESS_TOKEN_COOKIE_OPTIONS);
    }
  }

  // Generate a long-lived refresh token that will only exist on the server as an http-only cookie
  protected async createAndStoreRefreshToken(refreshTokenPayload: RefreshTokenPayload) {
    this.refreshToken = await new SignJWT(refreshTokenPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(consts.REFRESH_TOKEN_EXPIRES)
      .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET));

    // Create secure cookies to hold both tokens, which are only accessible by the server
    if (this.res) {
      // Add the cookie to the response when executed in the middleware
      this.res.cookies.set(consts.REFRESH_TOKEN_COOKIE, this.refreshToken, consts.REFRESH_TOKEN_COOKIE_OPTIONS);
    } else {
      // Cookies can only be modified in a server action or route handler (this will not work in middleware)
      (await cookies()).set(consts.REFRESH_TOKEN_COOKIE, this.refreshToken, consts.REFRESH_TOKEN_COOKIE_OPTIONS);
    }
  }

  // Clear both access and refresh token cookies (log the user out)
  protected async clearTokenCookies() {
    if ((await cookies()).has(consts.ACCESS_TOKEN_COOKIE)) (await cookies()).delete(consts.ACCESS_TOKEN_COOKIE);
    if ((await cookies()).has(consts.REFRESH_TOKEN_COOKIE)) (await cookies()).delete(consts.REFRESH_TOKEN_COOKIE);

    this.accessToken = this.refreshToken = undefined;
  }
}
