// import { NextRequest, NextResponse } from 'next/server';

// import prisma from '@/lib/db';
// import { error } from 'console';


// export async function POST(req: NextRequest, res: NextResponse) {
//     try {
//         const body = await req.json()
//         console.log('Received request body:', body);
//         if (!body) {
//             return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
//         }
//         let { value_text,color_theme,tenant_id , img_url } = body
//         if (!value_text || !color_theme || !tenant_id || !img_url) {
//             return NextResponse.json({ error: 'text_value is empty' })
//         }
//         const result = await prisma..create({
//             data: {
//                 value_text,
//                 color_theme,
//                 tenant_id,
//                 img_url
//             }
//         })
//         return NextResponse.json(result, { status: 200 });

//     } catch (error) {
//         console.log("🚀 ~ POST ~ error confrigration :", error)
//         NextResponse.json(
//             { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
//             { status: 500 }
//         )

//     }
// }