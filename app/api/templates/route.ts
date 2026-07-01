import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function GET(req: NextRequest) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const where: Record<string, unknown> = { userId: user!.id };
  if (category) where.category = category;

  const templates = await prisma.userTemplate.findMany({
    where,
    orderBy: { usageCount: "desc" },
  });

  return NextResponse.json(templates);
}

export async function POST(req: NextRequest) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const body = await req.json();

  const template = await prisma.userTemplate.create({
    data: {
      userId: user!.id,
      name: body.name,
      category: body.category,
      network: body.network,
      emoji: body.emoji || "✦",
      color: body.color || "var(--purple)",
    },
  });

  return NextResponse.json(template, { status: 201 });
}
