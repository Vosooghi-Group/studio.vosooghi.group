import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";


export async function DELETE(req: Request) {
  try {
    const session = await auth();

    // Check if the user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can delete job postings" },
        { status: 403 }
      );
    }

    const { id } = await req.json(); // Get the job ID from the request body
    await db.job.delete({ where: { id } });
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();

    // Check if the user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can update job postings" },
        { status: 403 }
      );
    }

    const { id, title, description,  } =
      await req.json();

    if (!id || !title || !description ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedJob = await db.job.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
