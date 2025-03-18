'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import prisma from "@/lib/db";
import { json } from "stream/consumers";
import ThemeContext from "@/components/context/themeContext";

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


interface ColorThememodel {
  primary: String;
  secondary: String;
  background: String;
  surface: String;
  text: String;
  color: String
  border: String
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
  const [ColorTheme, setColorTheme] = useState<ColorThememodel[]>([])
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
            teacher_id: true
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
        const response = await axios.get("/api/v1/lesson", {
          headers: {
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
        const response = await axios.get("http://localhost:3000/api/v1/GetAskedMe");
        console.log("AskedMe data fetched:", response.data);
        setAskedMeData(response.data);
      } catch (err) {
        console.error("Error fetching AskedMe data:", err);
      }
    };
    fetchAskedMeData();
    fetchLessons();
  }, []);

  useEffect(() => {
    const ColorThemes = async () => {
      try {
        const response = await axios.get('/api/v1/colormodel')
        console.log("🚀 ~ ColorThemes ~ response:", response.data)
        // console.log(response.data);
        setColorTheme(response.data)
      } catch (error) {
        console.log("🚀 ~ ColorThemes ~ error:", error)
      }
    }
    ColorThemes()
  }, [])
  if (loading) {
    return <div style={{background : ColorTheme[0]?.text as string , color:"white"}}>Loading lessons...</div>;
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
            <tr className="bg-gray-100 text-white-300" style={{ backgroundColor: ColorTheme[0]?.text as string }}>
              <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Day</th>
              <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Subject</th>
              <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Class</th>
              <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Teacher</th>
              <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Question</th>
              <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Search Text</th>
            </tr>
          </thead>
          <tbody>
            {filteredLesson.map((lesson, index) => {
              const asked = askedMeData[index] || {}; // Match AskedMe data with Lesson data by index
              return (
                <tr key={index} className="hover:bg-gray-50 transition duration-200 ease-in-out" style={{ backgroundColor: ColorTheme[0]?.background as string }}>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ color: ColorTheme[0]?.color as string, border: ColorTheme[0]?.border as string }}>{lesson.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ color: ColorTheme[0]?.color as string, border: ColorTheme[0]?.border as string }}>{lesson.day}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ color: ColorTheme[0]?.color as string, border: ColorTheme[0]?.border as string }}>{lesson.subject.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ color: ColorTheme[0]?.color as string, border: ColorTheme[0]?.border as string }}>{lesson.class.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ color: ColorTheme[0]?.color as string, border: ColorTheme[0]?.border as string }}>{lesson.teacher_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ color: ColorTheme[0]?.color as string, border: ColorTheme[0]?.border as string }}>{asked.question || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ color: ColorTheme[0]?.color as string, border: ColorTheme[0]?.border as string }}>{asked.search_text || "N/A"}</td>
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
