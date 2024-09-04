// next
import { NextRequest, NextResponse } from "next/server";

// prisma and db access
import { newOrder } from "@/features/cart/db/orders";

// other libraries
import stripe from "@/lib/stripe";

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
  } catch (error) {
    // ⚠️ Webhook signature verification failed
    return new NextResponse(null, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    // Sent when a customer successfully initiates a payment, but the payment has yet to complete
    case "payment_intent.processing": {
      // Send the customer an order confirmation that indicates their payment is pending
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} is processing!`);
      break;
    }
    // Sent when a customer successfully completes a payment
    case "payment_intent.succeeded": {
      try {
        // Send the customer an order confirmation and fulfill their order
        const paymentIntent = event.data.object;

        // Retrieve the details of the latest charge created by this payment intent
        const latestCharge = await stripe.charges.retrieve(paymentIntent.latest_charge as string);

        // Place a new order for either an existing or new customer
        await newOrder(paymentIntent, latestCharge);

        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      } catch (error) {
        // The funds have been captured; however, something went wrong throughout our fulfillment procedure
        // To cancel the payment after capture, you will need to issue a refund (https://stripe.com/docs/api/refunds)
      }
      break;
    }
    // Sent when a customer attempts a payment, but the payment fails
    case "payment_intent.payment_failed": {
      // Send an email or push notification to request another payment method
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} has failed!`);
      break;
    }
    default: {
      // Unexpected event type
      console.log(`Unhandled event type {${event.type}}`);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse(null, { status: 200 });
}
