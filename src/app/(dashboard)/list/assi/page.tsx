"use client";

import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { assignmentsData } from "@/lib/data";

type AssignmentList = {
  id: number;
  tenant_id: number
  title: string;
  start_date: string;
  due_date: string;
  lesson_id: number;
  lesson: { name: string };
  results: string
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
  searchType: "title" | "lesson"; // Add more search types if needed
  setSearchType: Dispatch<SetStateAction<"title" | "lesson">>;
}

const AssignmentPage = () => {
  const [Assigment, setAssigment] = useState<AssignmentList[]>([]);
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  const [ColorTheme, setColorTheme] = useState<ColorThememodel[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchType, setSearchType] = useState<"title" | "lesson">("title");
  const [lesson_id, setlessonId] = useState<any>(null)


  useEffect(() => {
    const fetchAssigementData = async () => {
      try {
        const response = await axios.get("/api/v1/assigments");
        console.log("🚀 ~ Exam Data Response:", response.data);
        setAssigment(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };
    const fetchAskedMeData = async () => {
      try {
        const response = await axios.get("/api/v1/GetAskedMe");
        console.log("AskedMe data fetched:", response.data);
        setAskedMeData(response.data);
      } catch (err) {
        console.error("Error fetching AskedMe data:", err);
      }
    };


    fetchAskedMeData();
    fetchAssigementData();
  }, []);

  // lesson Id to fatch data
  useEffect(() => {
    const fetchAssignmentBylessonId = async (lesson_id: number) => {
      try {
        const response = await axios.get(`/api/v1/assigments?lesson_id=${lesson_id}`)

        setAssigment(response.data)
        console.log("🚀 ~ fetchAssignment fro lesson ID ~ response:", response.data)
      } catch (error) {
        console.log("🚀 ~ fetchAssignment ~ error:", error)
      }
    }
    fetchAssignmentBylessonId(lesson_id)
  }, [lesson_id])
// color changes with the help of api backend
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
        <h1 className="hidden md:block text-lg font-semibold">All Assigement</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="number"
            placeholder="Please search the lesson Id"
            className="py-2 px-2 outline-none"
            value={lesson_id}
            onChange={(e) => setlessonId((e.target.value))}
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
          <tr className="bg-gray-100" style={{ backgroundColor: ColorTheme[0]?.text as string }}>
            <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white" >Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white ">tenant_id</th>
            <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Lesson Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Lesson Id</th>
            <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Question</th>
            <th className="px-6 py-3 text-left text-sm font-medium  uppercase border-b text-white">Search Text</th>
          </tr>
        </thead>
        <tbody>
          {Assigment.map((item, index) => {
            const asked = askedMeData[index] || {}; // This should be inside a block
            return (
              <tr key={item.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">

                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.tenant_id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.lesson.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.lesson_id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{asked.question || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{asked.search_text || "N/A"}</td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  );
};

export default AssignmentPage;
