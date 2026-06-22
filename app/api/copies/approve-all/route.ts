import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function POST() {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const result = await prisma.copy.updateMany({
    where: { userId: user!.id, status: "pending" },
    data: { status: "approved" },
  });

  return NextResponse.json({ approved: result.count });
}
