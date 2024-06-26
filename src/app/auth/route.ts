// next
import { NextRequest, NextResponse } from "next/server";

// other libraries
import Auth from "@/features/auth/Auth";
import { Credentials } from "@/features/auth/AuthTypes";
import { AuthError } from "@/features/auth/AuthBase";

export const dynamic = "force-dynamic";

// Obtain either the current or refreshed access token
export async function GET() {
  try {
    const auth = new Auth();
    const accessToken = await auth.getAccessToken();

    // Return the access token as a success response
    return new NextResponse(accessToken);
  } catch (error) {
    // If an auth error occurs, return a more specific error
    if (error instanceof AuthError) {
      return new NextResponse(error.message, { status: error.statusCode });
    }
    // Something else went wrong, so return a generic error
    return new NextResponse(null, { status: 500 });
  }
}

// Log the user out
export function DELETE() {
  try {
    const auth = new Auth();
    auth.logOut();

    // Return a success response
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    // If an auth error occurs, return a more specific error
    if (error instanceof AuthError) {
      return new NextResponse(error.message, { status: error.statusCode });
    }
    // Something else went wrong, so return a generic error
    return new NextResponse(null, { status: 500 });
  }
}

// Log in with the provided credentials
export async function POST(req: NextRequest) {
  try {
    const { username, password } = (await req.json()) as Credentials;
    if (!username || !password) throw new AuthError("All fields are required");

    const auth = new Auth();
    await auth.logIn({ username, password });

    // Return a success response
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    // If an auth error occurs, return a more specific error
    if (error instanceof AuthError) {
      return new NextResponse(error.message, { status: error.statusCode });
    }
    // Something else went wrong, so return a generic error
    return new NextResponse(null, { status: 500 });
  }
}
