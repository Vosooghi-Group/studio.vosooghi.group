import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const jobs = await db.job.findMany({
    where: {
      isAvailable: true,
    },
    include: {
      resumes: {
        include: {
          showcases: true, 
        },
      },
    },
  });
  return NextResponse.json(jobs);
}
