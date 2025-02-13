"use client";

import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

type AttendanceList = {
  id: number;
  present: boolean;
  date: string;
  lessonId: string;
  studentId: string;
};

const AttendenceListPage = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceList[]>([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("/page/auth/api/Attendenceget");
        console.log("🚀 ~ Attendance Data Response:", response.data);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Attendance</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <table className="min-w-full border border-gray-200 rounded-lg my-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Present</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Student ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Lesson ID</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
              <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.date}</td>
              <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.present ? "Yes" : "No"}</td>
              <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.studentId}</td>
              <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.lessonId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendenceListPage;
