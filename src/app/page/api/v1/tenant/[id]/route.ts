import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/db";

export async function PATCH(req: NextRequest, context: { params: { id: Number } }) {
  console.log("🚀 ~ PUT ~ context:", context)
  try {
    // const { id } = context.params; // Get ID from route params
    console.log("🚀 ~ PUT ~ id:", )
    // const tenantId = parseInt(id, 10); // Convert string ID to number
    console.log("🚀 ~ PUT ~ tenantId:")

    // if (isNaN(tenantId)) {
    //   return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    // }

    // const body = await req.json();
    
    // const { name, slug, logo_url, default_language_code, status } = body;
    console.log("🚀 ~ PUT ~ body:")

    // const tenant = await prisma.tenant.update({
    //   where: { id: tenantId },
    //   data: { name, slug, logo_url, default_language_code, status },
    // });
    console.log("🚀 ~ PUT ~ tenant:")

    // return NextResponse.json(tenant, { status: 200 });
    return 123
  } 
  catch (error: any) {
    console.error("Update Tenant Error:", error);
    // return NextResponse.json({ error: "Failed to update tenant",details: error }, { status: 500 });
  }
}
