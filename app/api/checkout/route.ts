import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, planName } = await req.json();

    if (!priceId || priceId.includes("placeholder")) {
      return NextResponse.json(
        { error: "Stripe não configurado. Adicione STRIPE_SECRET_KEY e os Price IDs no .env" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    const session = await auth();
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(planName)}`,
      cancel_url: `${baseUrl}/cancelado`,
      locale: "pt-BR",
      metadata: { planName },
      subscription_data: { metadata: { planName } },
    };

    if (session?.user?.email) {
      sessionParams.customer_email = session.user.email;
      sessionParams.client_reference_id = session.user.id;
    }

    const checkoutSession = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: unknown) {
    const stripeError = error as { message?: string; type?: string };
    console.error("Stripe error:", stripeError.message, stripeError.type);
    return NextResponse.json(
      { error: stripeError.message || "Erro ao criar sessão de pagamento" },
      { status: 500 }
    );
  }
}
