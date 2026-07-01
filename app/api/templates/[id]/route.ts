import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const body = await req.json();

  const template = await prisma.userTemplate.findFirst({
    where: { id: params.id, userId: user!.id },
  });

  if (!template) {
    return NextResponse.json({ error: "Template nao encontrado" }, { status: 404 });
  }

  const updated = await prisma.userTemplate.update({
    where: { id: params.id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.incrementUsage && { usageCount: { increment: 1 } }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const result = await prisma.userTemplate.deleteMany({
    where: { id: params.id, userId: user!.id },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Template nao encontrado" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
