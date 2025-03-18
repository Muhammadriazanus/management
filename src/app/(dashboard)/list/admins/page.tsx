"use client";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { string } from "zod";

interface adminsUser {
    name: String;
    slug: String;
    logo_url: string;
    default_language_code: String;
    status: String,
    super_admin_id: string
}

interface configuration {
    color_theme: string
    img_url: string
    value_text: string
}

const AdminPage = () => {
    // const [lessonId, setLessonId] = useState("");
    const [admin, setUserAdmin] = useState<adminsUser[]>([])
    const [configuration, setconfiguration] = useState<configuration[]>([])
    useEffect(() => {
        const adminUser = async () => {
            const response = await axios.get("/page/api/tenant")
            console.log("=================?response.data", response.data)
            setUserAdmin(response.data)
        }
        adminUser()

    }, [])
    useEffect(() => {
        const adminConfiguration = async () => {
            const response = await axios.get("/page/api/confrigrations")
            console.log("=================?response.data", response.data)
            setUserAdmin(response.data)
        }
        adminConfiguration()
        
    }, [])

    return (
        <div>

            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">ADMIN ACCESS</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
                            <Image src="/filter.png" alt="Filter" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
                            <Image src="/sort.png" alt="Sort" width={14} height={14} />
                        </button>
                    </div>
                </div>
            </div>
            <table className="min-w-full border border-gray-200 rounded-lg my-4">
                <thead>
                    <tr className="bg-gray-100">
                        {["name", "slug", "logo_url", "default_language_code", "status"].map(
                            (header) => (
                                <th
                                    key={header}
                                    className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b"
                                >
                                    {header}
                                </th>
                            )
                        )}
                    </tr>

                </thead>
                <tbody>
                    {admin.map((admins, index) => {
                        return (
                            <tr key={index} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.slug}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.logo_url}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.default_language_code}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
};

export default AdminPage;
