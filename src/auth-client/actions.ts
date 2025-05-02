"use server";

// next
import { redirect } from "next/navigation";
import { headers as getHeaders, cookies as getCookies } from "next/headers";

// other libraries
import PathFinder from "@/lib/PathFinder";

// openauth
import { subjects } from "./subjects";
import { client, setTokens } from ".";

// Check if the user is authenticated
export async function auth() {
  const cookies = await getCookies();
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  if (!accessToken) return false;

  const verified = await client.verify(subjects, accessToken.value, { refresh: refreshToken?.value });
  if (verified.err) return false;

  if (verified.tokens) await setTokens(verified.tokens.access, verified.tokens.refresh);

  return verified.subject;
}

// This function starts the oauth flow
export async function login(goingTo: "checkout" | "my-account") {
  const cookies = await getCookies();
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  if (accessToken) {
    const verified = await client.verify(subjects, accessToken.value, { refresh: refreshToken?.value });

    if (!verified.err && verified.tokens) {
      await setTokens(verified.tokens.access, verified.tokens.refresh);

      if (goingTo === "checkout") {
        redirect(PathFinder.toSfCheckoutPage(verified.subject.properties.customerId));
      } else {
        redirect(PathFinder.toSfCustomerAccount(verified.subject.properties.customerId));
      }
    }
  }

  const headers = await getHeaders();
  const host = headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const { url } = await client.authorize(`${protocol}://${host}/api/callback`, "code");

  redirect(url);
}

// This function clears the session
export async function logout() {
  const cookies = await getCookies();
  cookies.delete("access_token");
  cookies.delete("refresh_token");

  redirect("/");
}
