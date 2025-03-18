"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

type ExamList = {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  lesson_id: number;
  tenant_id: number
  lesson: { name: string };
};

interface AskedMe {
  id: string;
  question: string;
  search_text: string;
  start_time: string;
  end_time: string;
  tenant_id: number
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
  searchType: "title" | "lesson";
  setSearchType: Dispatch<SetStateAction<"title" | "lesson">>;
}

const ExamListPage = () => {
  const [examsData, setExamsData] = useState<ExamList[]>([]);
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  const [ColorTheme, setColorTheme] = useState<ColorThememodel[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchType, setSearchType] = useState<"title" | "lesson">("title");
  const [lesson_id, setLessonId] = useState<any>(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get("/api/v1/Exam");
        setExamsData(response.data);
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    fetchExamData();
  }, []);

  useEffect(() => {
    const fetchAskedMeData = async () => {
      try {
        const response = await axios.get("/api/v1/GetAskedMe");
        setAskedMeData(response.data);
      } catch (err) {
        console.error("Error fetching AskedMe data:", err);
      }
    };

    fetchAskedMeData();
  }, []);

  useEffect(() => {
    const fetchLessonData = async (lesson_id: number) => {
      try {
        const response = await axios.get(
          `/page/api/Exam?lesson_id=${lesson_id}`
        );
        console.log("🚀 ~ fetchLessonData ~ response: for lessonId", response.data)
        setExamsData(response.data);
      } catch (error) {
        console.error("Error fetching exams data:", error);
      }
    };
    fetchLessonData(lesson_id);

  }, [lesson_id]);
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
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="number"
            placeholder="Enter Lesson ID"
            className="py-2 px-2 border rounded outline-none"
            value={lesson_id}
            onChange={(e) => setLessonId(e.target.value)}
          />
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

      {/* TABLE */}
      <table className="min-w-full border border-gray-200 rounded-lg my-4">
        <thead>
          <tr className="bg-gray-100" style={{ backgroundColor: ColorTheme[0]?.text as string }}>
            {[
              "Title",
              "tenant_id",
              "Lesson",
              "Lesson Id",
              "Question",
              "Search Text",
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {examsData.map((exam, index) => {
            const asked = askedMeData[index] || {};;
            return (
              <tr key={exam.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{exam.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{exam.tenant_id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{exam.lesson.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{exam.lesson_id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{asked.question || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{asked.search_text || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExamListPage;
