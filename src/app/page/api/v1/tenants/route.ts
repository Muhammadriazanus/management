import {NextResponse} from 'next/server'

import prisma from '@/lib/db'
// import { error } from 'console'

export async function POST(req:Request) {
    try {
        const body = await req.json()
    console.log("🚀 ~ POST ~ body:", body)
    if(!body){
        return NextResponse.json({error : `request body is empty `},{status:400})
    }
    // call data from body 
    let {name , slug , logo_url , default_language_code,status} = body
    // data base prisma 

    const result = await prisma.tenant.create({
        data : {
            name,
            slug,
            logo_url,
            default_language_code,
            status
        }
    })
    return NextResponse.json(result,{status:200})
    } catch (error) {
        return NextResponse.json(
            {error : error instanceof Error ? error.message :'An error occurred while creating the Parent record' },
            {status : 500}
        )
    }
    
}