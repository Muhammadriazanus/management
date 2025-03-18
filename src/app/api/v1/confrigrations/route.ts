
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/db';

// GET handler
export async function GET(req:NextRequest) {

  
  try {
    const configurationRecords = await prisma.configuration.findMany();;
    console.log("🚀 ~ GET ~ configurationRecords:", configurationRecords)
    return NextResponse.json(configurationRecords);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
