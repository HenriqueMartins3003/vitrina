import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function GET(req: NextRequest) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const month = searchParams.get("month");

  const where: Record<string, unknown> = { userId: user!.id };
  if (status) where.status = status;
  if (month) where.monthRef = month;

  const copies = await prisma.copy.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(copies);
}

export async function POST(req: NextRequest) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const body = await req.json();

  const copy = await prisma.copy.create({
    data: {
      userId: user!.id,
      network: body.network,
      type: body.type,
      date: body.date,
      caption: body.caption,
      hashtags: body.hashtags || "",
      status: body.status || "pending",
      monthRef: body.monthRef,
    },
  });

  return NextResponse.json(copy, { status: 201 });
}
