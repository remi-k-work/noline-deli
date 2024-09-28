// next
import { NextRequest, NextResponse } from "next/server";

// other libraries
import Auth from "./features/auth/Auth";
import { AuthError } from "@/features/auth/AuthBase";
import PathFinder from "./lib/PathFinder";

export const config = {
  matcher: "/manager/:path*",
};

export async function middleware(req: NextRequest) {
  try {
    // Get the outgoing response
    const res = NextResponse.next();

    // Validate that the user is authenticated
    const auth = new Auth(res);
    await auth.getAccessToken();

    // If necessary, a renewed access token cookie will be included in the outgoing response
    return res;
  } catch (error) {
    // If an auth error occurs, send the user to the manager's login page
    if (error instanceof AuthError) {
      return NextResponse.redirect(new URL(PathFinder.toManagerLogin(), req.url));
    }
    // Something else went wrong, so return a generic error
    return new NextResponse(null, { status: 401 });
  }
}
