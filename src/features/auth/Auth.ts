// next
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// other libraries
import AuthBase, { AuthError } from "./AuthBase";
import { AccessTokenPayload, Credentials, RefreshTokenPayload } from "./types";
import { getIronSession } from "iron-session";
import { CaptchaSession } from "@/app/api/auth/captcha/[name]/route";
import { CAPTCHA_PASSWORD, CAPTCHA_USERNAME } from "@/features/auth/consts";

export default class Auth extends AuthBase {
  constructor(res?: NextResponse) {
    super(res);
  }

  // Log in with the provided credentials
  async logIn(credentials: Credentials) {
    if (!(await this.isAuthenticated(credentials))) throw new AuthError("Unauthorized", 401);

    await this.createAndStoreAccessToken(this.accessTokenPayload);
    await this.createAndStoreRefreshToken(this.refreshTokenPayload);
  }

  // Log the user out
  async logOut() {
    await this.clearTokenCookies();
  }

  // Obtain either the current or refreshed access token
  async obtainAccessToken() {
    try {
      // Is the access token still valid?
      await this.verifyAccessToken();

      // Yes, simply return it
      return await this.getAccessToken();
    } catch {
      // The access token appears to be invalid or missing; renew it
      await this.renewAccessToken();

      // Return the renewed access token
      return await this.getAccessToken();
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private isUserFound({ userId }: RefreshTokenPayload) {
    // const foundUser = await User.findOne({ username: decoded.username }).exec();
    // if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
    return true;
  }

  // Normally, this is where the user's credentials are verified against the database
  private async isAuthenticated({ username, password }: Credentials) {
    // const foundUser = await User.findOne({ username }).exec();
    // if (!foundUser || !foundUser.active) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    // const match = await bcrypt.compare(password, foundUser.password);
    // if (!match) return res.status(401).json({ message: "Unauthorized" });

    // Verify the user's credentials against the captcha-generated credentials
    const { captchaString: captchaUsername } = await getIronSession<CaptchaSession>(await cookies(), {
      password: process.env.SESSION_SECRET as string,
      cookieName: CAPTCHA_USERNAME,
    });
    const { captchaString: captchaPassword } = await getIronSession<CaptchaSession>(await cookies(), {
      password: process.env.SESSION_SECRET as string,
      cookieName: CAPTCHA_PASSWORD,
    });

    if (username === captchaUsername && password === captchaPassword) return true;

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
