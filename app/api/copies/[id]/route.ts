import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const body = await req.json();

  const result = await prisma.copy.updateMany({
    where: { id: params.id, userId: user!.id },
    data: {
      ...(body.status !== undefined && { status: body.status }),
      ...(body.caption !== undefined && { caption: body.caption }),
      ...(body.editText !== undefined && { editText: body.editText }),
    },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Copy nao encontrada" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const result = await prisma.copy.deleteMany({
    where: { id: params.id, userId: user!.id },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Copy nao encontrada" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
