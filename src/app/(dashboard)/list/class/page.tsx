'use client'

import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { string } from "zod";

type ClassList = {
  id: number;
  tenant_id: number;
  name: string;
  capacity: string;
  supervisor_id: string;
  grade: { level: number };
};
interface AskedMe {
  id: string;
  question: string;
  search_text: string;
  start_time: string;
  end_time: string;
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
const ClassListPage = () => {
  const [classData, setClassData] = useState<ClassList[]>([]);
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  const [ColorTheme, setColorTheme] = useState<ColorThememodel[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchType, setSearchType] = useState<"name">("name");


  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get('/api/v1/class');
        setClassData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAskedMeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/GetAskedMe");
        setAskedMeData(response.data);
      } catch (err) {
        console.error("Error fetching AskedMe data:", err);
      }
    };

    fetchClassData();
    fetchAskedMeData();
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

  const filteredClassa = classData.filter((classes) =>
    [classes.name, classes.capacity, classes.supervisor_id, classes.tenant_id]
      .some(field => String(field || "").toLowerCase().includes(searchText.toLowerCase()))
  );
  console.log("🚀 ~ ClassListPage ~ filteredClassa:", filteredClassa)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex justify-around flex-col">
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            {/* <TableSearch /> */}
            <input
              type="text"
              placeholder="Enter the Class Name"
              className="py-2 px-2 outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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

        <table className="min-w-full border border-gray-200 rounded-lg my-4">
          <thead>
            <tr className="bg-gray-100" style={{ backgroundColor: ColorTheme[0]?.text as string }}>
              {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Class Id</th> */}
              <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Tenant_Id</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Capacity</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Supervisor Id</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Grade Level</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Question</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Search Text</th>
            </tr>
          </thead>
          <tbody>
            {/* ClassList Data */}
            {filteredClassa.map((item, index) => {
              const asked = askedMeData[index] || {};
              return (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                  {/* <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.id}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.tenant_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.capacity}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.supervisor_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{item.grade.level}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{asked.question || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string }}>{asked.search_text || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassListPage;
