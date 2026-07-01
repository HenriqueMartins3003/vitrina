import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth-helpers";

export async function GET() {
  const { user, error } = await getAuthenticatedUser();
  if (error) return error;

  const now = new Date();
  const currentMonthRef = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const [publishedCount, pendingCount, approvedCount, totalCount, nextPost, recentCopies] = await Promise.all([
    prisma.copy.count({
      where: { userId: user!.id, status: "approved", monthRef: currentMonthRef },
    }),
    prisma.copy.count({
      where: { userId: user!.id, status: "pending" },
    }),
    prisma.copy.count({
      where: { userId: user!.id, status: "approved" },
    }),
    prisma.copy.count({
      where: { userId: user!.id, status: { in: ["approved", "rejected"] } },
    }),
    prisma.scheduledPost.findFirst({
      where: {
        userId: user!.id,
        status: "scheduled",
        year: { gte: now.getFullYear() },
      },
      orderBy: [{ year: "asc" }, { month: "asc" }, { day: "asc" }, { time: "asc" }],
    }),
    prisma.copy.findMany({
      where: { userId: user!.id },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, network: true, type: true, status: true, updatedAt: true, caption: true },
    }),
  ]);

  const approvalRate = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;

  return NextResponse.json({
    stats: {
      published: publishedCount,
      pending: pendingCount,
      approvalRate,
      nextPost,
    },
    recentActivity: recentCopies,
  });
}
