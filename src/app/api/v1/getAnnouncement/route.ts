// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET handler
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const class_id = url.searchParams.get("class_id")?.trim()
  try {
    const AnnouncementRecord = await prisma.announcement.findMany({
      where: {
        ...(class_id && { class_id: parseInt(class_id) })
      },

      include: {
        class: {
          select: {
            name: true
          }
        }
      }
    });
    return NextResponse.json(AnnouncementRecord);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
