"use client";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { string } from "zod";

interface schooldetails {
    name: String;
    teacher: String;
    address: string;
    phone_number: String;
    
}

const AdminPage = () => {
    // const [lessonId, setLessonId] = useState("");
    const [schooldetails, setSchoolDetails] = useState<schooldetails[]>([])
    useEffect(() => {
        const adminUser = async () => {
            const response = await axios.get("/api/v1/schooldetails")
            console.log("=================?response.data", response.data)
            setSchoolDetails(response.data)
        }
        adminUser()
    }, [])

    return (
        <div>

            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">REGISTOR SCHOOL DETAILS</h1>
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
                        {["name", "teacher", "address", "phone_number"].map(
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
                    {schooldetails.map((admins, index) => {
                        return (
                            <tr key={index} className="hover:bg-gray-50  transition duration-200 ease-in-out">
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.teacher}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.address}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 border-b">{admins.phone_number}</td>
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
};

export default AdminPage;
