import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function GET(req: NextRequest) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const month = parseInt(searchParams.get("month") || String(new Date().getMonth() + 1));
  const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()));

  const posts = await prisma.scheduledPost.findMany({
    where: { userId: user!.id, month, year },
    orderBy: [{ day: "asc" }, { time: "asc" }],
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const body = await req.json();

  const post = await prisma.scheduledPost.create({
    data: {
      userId: user!.id,
      title: body.title,
      network: body.network,
      time: body.time,
      day: body.day,
      month: body.month,
      year: body.year,
      status: body.status || "scheduled",
      copyId: body.copyId,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
