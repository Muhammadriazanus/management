// pages/api/askedMe.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    console.log('Received request body:', body);

    // Check if body is empty
    if (!body) {
      return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
    }

    // Destructure required fields
    let { start_time, end_time,search_text, question,tenant_id} = body;

    // Validate required fields
    // if (!start_time || !end_time || !question || !search_text || tenant_id) {
    //   return NextResponse.json(
    //     { error: 'Missing required fields:  or searchText' },
    //     { status: 400 }
    //   );
    // }

    
    const result = await prisma.askedMe.create({
      
      data: {
        search_text,
        question,
        end_time,
        start_time,
        tenant_id  
      },
    });

    // Return the created record as JSON
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    // Catch and log errors
    // console.error('Error creating AskedMe record:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while creating the AskedMe record' },
      { status: 500 }
    );
  }
}
