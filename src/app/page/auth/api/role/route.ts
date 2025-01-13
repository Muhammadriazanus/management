import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest) {
  try {
    // Parse request body
    const { roleName, parentId, teacherId, studentId, adminId } = req.body;

    console.log("🚀 ~ POST ~ req.body:", req.body);

    // Find the admin by ID
    if (!adminId) {
      return NextResponse.json({ message: "Admin ID is required" }, { status: 400 });
    }

    const AdminFindId = await prisma.admin.findUnique({
      where: { id: adminId }, // Use `adminId` from the request body
    });
    console.log("🚀 ~ POST ~ AdminFindId:", AdminFindId)

    if (!AdminFindId) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }
    // find out parent Id 
    const parentIds = await prisma.parent.findUnique({
        where : {id : parentId}
    })
    console.log("🚀 ~ POST ~ parentIds:", parentIds)
    if(!parentIds)
    

    // Example: Save data to the database (replace with your own logic)
    // const newRole = await prisma.role.create({
    //   data: { roleName, parentId, teacherId, studentId, adminId },
    // });

    return NextResponse.json({
      message: "Data received successfully",
      data: { roleName, parentId, teacherId, studentId, adminId },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
