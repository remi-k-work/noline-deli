// next
import { NextRequest, NextResponse } from "next/server";

// prisma and db access
import { newOrder } from "@/features/cart/db/orders";

// other libraries
import stripe from "@/services/stripe";

export async function POST(req: NextRequest) {
  // The incoming event
  let event;

  try {
    // Get our endpoint secret so that we can verify the incoming event (to make sure requests are generated by stripe)
    const endpointSecret = process.env.NODE_ENV === "production" ? process.env.STRIPE_WEBHOOK_SECRET_PRO : process.env.STRIPE_WEBHOOK_SECRET_DEV;

    // Get the signature sent by stripe
    const signature = req.headers.get("stripe-signature");

    // Construct and verify the signature of an event from the provided details
    event = stripe.webhooks.constructEvent(await req.text(), signature as string, endpointSecret as string);
  } catch {
    // ⚠️ Webhook signature verification failed
    return new NextResponse(null, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      try {
        // Retrieve the checkout session in our preferred method to ensure that all relevant info is expanded upon
        const checkoutSession = await stripe.checkout.sessions.retrieve(event.data.object.id, {
          expand: ["payment_intent.payment_method", "payment_intent.latest_charge", "shipping_cost.shipping_rate"],
        });

        // Start the fulfillment process only for paid orders
        if (checkoutSession.payment_status !== "unpaid") {
          // Place a new order for this customer
          await newOrder(checkoutSession);
        }
      } catch {
        return new NextResponse(null, { status: 500 });
      }
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse(null, { status: 200 });
}
