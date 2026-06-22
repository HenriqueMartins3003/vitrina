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

  const briefing = await prisma.briefing.upsert({
    where: { userId: user!.id },
    create: {
      userId: user!.id,
      negocio: body.negocio,
      publico: body.publico,
      tom: body.tom,
      referencias: body.referencias,
      datas: body.datas,
      evitar: body.evitar,
      chatHistory: body.chatHistory,
      completed: body.completed ?? false,
    },
    update: {
      negocio: body.negocio,
      publico: body.publico,
      tom: body.tom,
      referencias: body.referencias,
      datas: body.datas,
      evitar: body.evitar,
      chatHistory: body.chatHistory,
      completed: body.completed,
    },
  });

  return NextResponse.json(briefing);
}
