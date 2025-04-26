// next
import { cookies as getCookies } from "next/headers";

// openauth
import { createClient } from "@openauthjs/openauth/client";

// Use the openauth client to kick off your oauth flows, exchange tokens, refresh tokens, and verify tokens
export const client = createClient({ clientID: "nextjs", issuer: process.env.AUTH_SERVER_URL });

// Once authenticated, we will save the user's access and refresh tokens in http-only cookies
export async function setTokens(access: string, refresh: string) {
  const cookies = await getCookies();

  cookies.set({ name: "access_token", value: access, httpOnly: true, sameSite: "lax", path: "/", maxAge: 34560000, secure: true });
  cookies.set({ name: "refresh_token", value: refresh, httpOnly: true, sameSite: "lax", path: "/", maxAge: 34560000, secure: true });
}
