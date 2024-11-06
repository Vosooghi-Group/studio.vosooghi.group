import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { jobId, age, gender, showcases, userId } = await req.json();

  if (!jobId || age === undefined || !gender || !showcases || !userId) {
    return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
  }

  const job = await db.job.findUnique({ where: { id: jobId } });

  if (!job || !job.isAvailable) {
    return NextResponse.json({ error: "Invalid or unavailable job" }, { status: 400 });
  }

  const showcasesArray = Array.isArray(showcases) ? showcases : [showcases];

  try {
    const resume = await db.resume.create({
      data: {
        age,
        gender,
        user: { connect: { id: userId } },
        job: { connect: { id: jobId } },
        showcases: {
          create: showcasesArray.map(url => ({
            url,
          })),
        },
      },
    });

    await db.notification.create({
      data: {
        message: `New resume submitted by ${session.user.email} for job ${job.title}`,
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Failed to create resume or notification", error);
    return NextResponse.json({ error: "Failed to create resume or notification" }, { status: 500 });
  }
}
