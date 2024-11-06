import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { age, gender, showcases }: { age: number; gender: string; showcases: string[] } = await req.json();

  if (!age || !gender || !showcases || !Array.isArray(showcases)) {
    return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
  }


  const showcaseData = showcases.map(url => ({
    url, 
    resume: { connect: { userId: session.user.id } }, 
  }));

  try {
    const newResume = await db.resume.create({
      data: {
        age,
        gender,
        jobId: params.id,
        userId: session.user.id,
        showcases: {
          create: showcaseData,
        },
      },
    });

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error("Failed to create resume", error);
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 });
  }
}
