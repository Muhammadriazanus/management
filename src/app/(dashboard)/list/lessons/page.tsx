'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import prisma from "@/lib/db";
import { json } from "stream/consumers";

type LessonList = {
  name: string;
  tenant_id: number
  day: string;
  start_time: string;
  class_id: number;
  subject_id: number;
  end_time: string;
  subject: { name: string };
  class: { name: string };
  teacher_id: string;
};
interface AskedMe {
  id: string;
  question: string;
  search_text: string;
  startTime: string;
  endTime: string;
}
interface TableSearchProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchType: "name" | "lesson" | "teacher" | "class" | "subject";
  setSearchType: Dispatch<SetStateAction<"name" | "lesson" | "teacher" | "class" | "subject">>;
}
const LessonListPage = () => {
  const [lessonData, setLessonData] = useState<LessonList[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  const [searchType, setSearchType] = useState<"name" | "lesson" | "teacher" | "class" | "subject">("subject");
  const [loading, setLoading] = useState(true);
  const [subjectId, setSubjectId] = useState<any>(null)
  const [classId, setClassId] = useState<any>(null)
  const [teacherId, setTeacherId] = useState<any>(null)





  useEffect(() => {
    const tenantId = async () => {
      try {
        const ids = Array.from({ length: 30 }, (_, i) => i + 1)
        const tenant = await prisma.lesson.findMany({
          where: {
            tenant_id: { in: ids }
          },
          select: {
            teacher_id : true
          }
        })
        console.log("🚀 ~ tenantId ~ tenant:", tenant)
      } catch (error) {
        console.log(error);
      }
    }
    tenantId()
  }, [])
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("/page/api/lesson",{
          headers : {
            "Content-Type": "application/json",
          },
          
        });
        console.log("Fetched lesson data:", response.data);
        setLessonData(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchAskedMeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/page/api/GetAskedMe");
        console.log("AskedMe data fetched:", response.data);
        setAskedMeData(response.data);
      } catch (err) {
        console.error("Error fetching AskedMe data:", err);
      }
    };
    fetchAskedMeData();
    fetchLessons();
  }, []);


  if (loading) {
    return <div>Loading lessons...</div>;
  }
  const filteredLesson = lessonData.filter((lesson) =>
    [lesson.name, lesson.subject.name, lesson.tenant_id, lesson.class.name]
      .some(field => String(field || "").toLowerCase().includes(searchText.toLowerCase()))
  );
  console.log("🚀 ~ lessonClassId ~ lessonClassId:", filteredLesson)


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <input
              type="text"
              placeholder="Please search the query"
              className="py-2 px-2 outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} // No need for explicit type change here
            />
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Name</th>
              {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Tenant_Id</th> */}
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Day</th>
              {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Start Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">End Time</th> */}
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Subject</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Class</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Teacher</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Question</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Search Text</th>
            </tr>
          </thead>
          <tbody>
            {filteredLesson.map((lesson, index) => {
              const asked = askedMeData[index] || {}; // Match AskedMe data with Lesson data by index
              return (
                <tr key={index} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{lesson.name}</td>
                  {/* <td className="px-6 py-4 text-sm text-gray-700 border-b">{lesson.tenant_id}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{lesson.day}</td>
                  {/* <td className="px-6 py-4 text-sm text-gray-700 border-b">{lesson.startTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{lesson.endTime}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{lesson.subject.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{lesson.class.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{lesson.teacher_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{asked.question || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{asked.search_text || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonListPage;
