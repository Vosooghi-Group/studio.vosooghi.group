import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; 

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const job = await db.job.findUnique({
      where: {
        id: id,
      },
      include: {
        resumes: true, 
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }


    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ error: 'Error fetching job' }, { status: 500 });
  }
}
