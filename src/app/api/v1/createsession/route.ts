// import db from '../../lib/db'
// import prisma from '@/lib/db'
import db from "@/lib/db"
import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from "crypto"; // For generating session IDs
function generateSessionId(): string {
    return crypto.randomBytes(16).toString("hex")
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const id = req.body
        if (!id) {
            return res.status(400).json({ error: "User Id not required" })
        }
        // const user = req.body
        const admin = db.admin.findUnique({
            where: { id }
        })
        console.log("🚀 ~ admin:", admin)
        if (!admin) {
            return res.status(400).json({ error: "admin not define " })
        }
        const sessionId = generateSessionId()
        await db.admin.create({
            data: {
                sessionId,
                userId: id,
                createdAt: new Date(),
            }
        })

        res.status(200).json({ sessionId })
    } catch (error) {
        console.log("🚀 ~ error:", error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}