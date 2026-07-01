import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function GET() {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const briefing = await prisma.briefing.findUnique({
    where: { userId: user!.id },
  });

  return NextResponse.json(briefing);
}

export async function POST(req: NextRequest) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const body = await req.json();
  const od = body.onboardingData;

  // Populate legacy text fields from structured onboarding data for AI compatibility
  const legacyFields = od ? {
    negocio: [od.businessName, od.products].filter(Boolean).join(" — ").slice(0, 1000) || body.negocio,
    publico: [...(od.targetAudience || []), od.clientPain].filter(Boolean).join(" · ").slice(0, 1000) || body.publico,
    tom: od.toneOfVoice || body.tom,
    referencias: od.brandReferences || body.referencias,
    evitar: od.contentToAvoid || body.evitar,
  } : {
    negocio: body.negocio,
    publico: body.publico,
    tom: body.tom,
    referencias: body.referencias,
    evitar: body.evitar,
  };

  const briefing = await prisma.briefing.upsert({
    where: { userId: user!.id },
    create: {
      userId: user!.id,
      ...legacyFields,
      datas: body.datas,
      chatHistory: body.chatHistory,
      onboardingData: od ?? undefined,
      completed: body.completed ?? false,
    },
    update: {
      ...legacyFields,
      datas: body.datas,
      chatHistory: body.chatHistory,
      onboardingData: od ?? undefined,
      completed: body.completed,
    },
  });

  return NextResponse.json(briefing);
}
