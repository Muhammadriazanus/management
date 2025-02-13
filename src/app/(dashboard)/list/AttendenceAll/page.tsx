"use client";

import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import prisma from "@/lib/db";

type AttendanceList = {
  id: number;
  tenant_id : number
  present: boolean;
  date: string;
  lesson_id: number;
  lesson: { name: string };
  student: { name: string };
};

interface AskedMe {
  id: string;
  question: string;
  search_text: string;
  startTime: string;
  endTime: string;
}

const AttendenceListPage = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceList[]>([]);
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  const [lesson_id, setLessonId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`/page/api/Attendenceget`);
        console.log("🚀 ~ Attendance Data Response:", response.data);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    const fetchAskedMeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/page/api/GetAskedMe"
        );
        console.log("AskedMe data fetched:", response.data);
        setAskedMeData(response.data);
      } catch (err) {
        console.error( "Error fetching AskedMe data:", err);
      }
    };

    fetchAskedMeData();
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    if (lesson_id !== null) {
      const fetchLessonData = async (lesson_id:number) => {
        try {
          const response = await axios.get(
            `/page/api/Attendenceget?lesson_id=${lesson_id}`
          );
          console.log(
            "🚀 ~ Attendance Data Response for lesson Id:",
            response.data
          );
          setAttendanceData(response.data); // Update attendance data for the lesson
        } catch (error) {
          console.error("Error fetching attendance data:", error);
        }
      };

      fetchLessonData(lesson_id);
    }
  }, [lesson_id]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Attendance</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* <TableSearch /> */}
          <input
            type="text"
            placeholder="Enter the lesson Id"
            value={lesson_id || ""}
            onChange={(e) => setLessonId(Number(e.target.value) || null)}
          />
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
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
            tenant_id
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Present
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Student
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Lesson
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Lesson Id
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Question
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Search Text
            </th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item,index) => {
             const asked = askedMeData[index] || {};  // Find matching AskedMe data
            return (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {item.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {item.tenant_id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {item.present ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {item.student.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {item.lesson.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {item.lesson_id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {asked.question || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {asked.search_text || "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendenceListPage;
