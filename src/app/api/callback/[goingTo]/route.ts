// next
import { type NextRequest, NextResponse } from "next/server";

// other libraries
import PathFinder from "@/lib/PathFinder";
import { faker } from "@faker-js/faker";

// openauth
import { client, setTokens } from "@/auth-client";

// When the openauth flow is complete, users will be redirected back to our next.js app
export async function GET(req: NextRequest, { params }: { params: Promise<{ goingTo: string }> }) {
  // Get the user's/customer's original destination
  const { goingTo } = await params;

  // Let us add a callback route to handle this
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  const exchanged = await client.exchange(code!, `${url.origin}/api/callback/${goingTo}`);

  if (exchanged.err) return NextResponse.json(exchanged.err, { status: 400 });

  await setTokens(exchanged.tokens.access, exchanged.tokens.refresh);

  // Once the user/customer is authenticated, we redirect them to their original destination (customer id will be read from the session)
  if (goingTo === "checkout") return NextResponse.redirect(`${url.origin}` + PathFinder.toSfCheckoutPage(faker.string.uuid()));
  else return NextResponse.redirect(`${url.origin}` + PathFinder.toSfCustomerAccount(faker.string.uuid()));
}
