// next
import { NextResponse } from "next/server";

// other libraries
import AuthBase, { AuthError } from "./AuthBase";
import { AccessTokenPayload, Credentials, RefreshTokenPayload } from "./AuthTypes";

export default class Auth extends AuthBase {
  constructor(res?: NextResponse) {
    super(res);
  }

  // Log in with the provided credentials
  async logIn(credentials: Credentials) {
    if (!this.isAuthenticated(credentials)) throw new AuthError("Unauthorized", 401);

    await this.createAndStoreAccessToken(this.accessTokenPayload);
    await this.createAndStoreRefreshToken(this.refreshTokenPayload);
  }

  // Log the user out
  logOut() {
    this.clearTokenCookies();
  }

  // Obtain either the current or refreshed access token
  async getAccessToken() {
    try {
      // Is the access token still valid?
      await this.verifyAccessToken();

      // Yes, simply return it
      return this.accessToken;
    } catch (error) {
      // The access token appears to be invalid or missing; renew it
      await this.renewAccessToken();

      // Return the renewed access token
      return this.accessToken;
    }
  }

  private async renewAccessToken() {
    // Is the refresh token still valid? (A valid refresh token is a must!)
    const refreshTokenPayload = await this.verifyRefreshToken();

    // Make sure we have the specified user in our database
    if (!this.isUserFound(refreshTokenPayload)) throw new AuthError("Unauthorized", 401);

    // A new access token should be provided because the refresh token is still valid
    await this.createAndStoreAccessToken(this.accessTokenPayload);
  }

  // Make sure we have the specified user in our database
  private isUserFound({ userId }: RefreshTokenPayload) {
    // const foundUser = await User.findOne({ username: decoded.username }).exec();
    // if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
    return true;
  }

  // Normally, this is where the user's credentials are verified against the database
  private isAuthenticated({ username, password }: Credentials) {
    // const foundUser = await User.findOne({ username }).exec();
    // if (!foundUser || !foundUser.active) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    // const match = await bcrypt.compare(password, foundUser.password);
    // if (!match) return res.status(401).json({ message: "Unauthorized" });
    if (username === "test" && password === "test") return true;

    return false;
  }

  // The payload entered in both the access and refresh tokens should be from the already authenticated/found user
  private get accessTokenPayload() {
    const accessTokenPayload: AccessTokenPayload = { email: "test@test.com", username: "test", role: "USER" };
    return accessTokenPayload;
  }

  private get refreshTokenPayload() {
    const refreshTokenPayload: RefreshTokenPayload = { userId: "123" };
    return refreshTokenPayload;
  }
}
