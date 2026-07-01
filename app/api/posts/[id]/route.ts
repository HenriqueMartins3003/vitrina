import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const body = await req.json();

  const result = await prisma.scheduledPost.updateMany({
    where: { id: params.id, userId: user!.id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.time !== undefined && { time: body.time }),
      ...(body.status !== undefined && { status: body.status }),
    },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Post nao encontrado" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const result = await prisma.scheduledPost.deleteMany({
    where: { id: params.id, userId: user!.id },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Post nao encontrado" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
