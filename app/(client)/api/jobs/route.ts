import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  const jobs = await db.job.findMany({
    where: {
      isAvailable: true,
    },
  });
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can create job postings" },
        { status: 403 }
      );
    }

    const { title, description, employmentType, requiredSkills } = await req.json();

    if (!title || !description || !employmentType || !requiredSkills) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newJob = await db.job.create({
      data: {
        title,
        description,
        employmentType, 
        requiredSkills, 
        isAvailable: true,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
