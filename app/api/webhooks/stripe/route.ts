import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email || session.customer_details?.email;
      const planName = session.metadata?.planName;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const clientRefId = session.client_reference_id;

      if (email) {
        const where = clientRefId ? { id: clientRefId } : { email };
        await prisma.user.updateMany({
          where,
          data: {
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            planName,
            planStatus: "active",
          },
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const planName = subscription.metadata?.planName;
      const status = subscription.status === "active" ? "active" : subscription.status === "past_due" ? "past_due" : subscription.status;

      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: {
          planStatus: status,
          ...(planName && { planName }),
          stripePriceId: subscription.items.data[0]?.price?.id,
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: { planStatus: "canceled" },
      });
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: { planStatus: "past_due" },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
