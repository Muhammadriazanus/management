"use client";

import Image from "next/image";
import { use, useContext, useEffect, useState } from "react";
import axios from "axios";

import ThemeContext from "@/components/context/themeContext";

type AnnouncementList = {
  id: number;
  title: string;
  description: string;
  date: string;
  lessonId: number;
  class: { name: string };
  class_id: number
};
interface AskedMe {
  id: string;
  question: string;
  search_text: string;
  start_time: string;
  end_time: string;
}

const AnnouncementListPage = () => {
  const [AnnouncementData, setAnnouncementData] = useState<AnnouncementList[]>([]);
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  // const [ColorTheme, setColorTheme] = useState<ColorThememodel[]>([]);
  const [class_id, setClassId] = useState<any>(null)
  const theme = useContext(ThemeContext) 
  console.log("🚀 ~ AnnouncementListPage ~ theme:", theme)

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const response = await axios.get("/api/v1/getAnnouncement");
        console.log("🚀 ~ Announcement Data Response:", response.data);
        setAnnouncementData(response.data); // Update state with fetched data
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
    fetchAnnouncementData();
  }, []);
  useEffect(() => {
    // localhost:3000/page/auth/api/getAnnouncement?classId=1
    const fetchDataforclassId = async (class_id: number) => {
      try {
        const response = await axios.get(`/api/v1/getAnnouncement?class_id=${class_id}`)
        console.log("🚀 ~ fetchDataforclassId ~ response:", response)
        setAnnouncementData(response.data)
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchDataforclassId(class_id)

  }, [class_id])

  // useEffect(() => {
  //   const ColorThemes = async () => {
  //     try {
  //       const response = await axios.get('/page/api/colormodel')
  //       console.log("🚀 ~ ColorThemes ~ response:", response.data)
  //       // console.log(response.data);
  //       setColorTheme(response.data)
  //     } catch (error) {
  //       console.log("🚀 ~ ColorThemes ~ error:", error)
  //     }
  //   }
  //   ColorThemes()
  // }, [])
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Announcement</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="number"
            placeholder="Please search the class Id"
            className="py-2 px-2 outline-none"
            value={class_id}
            onChange={(e) => setClassId((e.target.value))}
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
          <tr className="bg-gray-100" style={{ backgroundColor: theme[0]?.text as string }}>
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">class</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">class Id</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Question</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase border-b">Search Text</th>

          </tr>
        </thead>
        <tbody>
          {AnnouncementData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition duration-200 ease-in-out">
              <td className="px-6 py-4 text-sm text-gray-700 border-b border-none" style={{ backgroundColor: theme[0]?.primary as string }}>{item.title}</td>
              <td className="px-6 py-4 text-sm text-gray-700 border-b border-none" style={{ backgroundColor: theme[0]?.primary as string }}>{item.description}</td>
              <td className="px-6 py-4 text-sm text-gray-700 border-b border-none" style={{ backgroundColor: theme[0]?.primary as string }}>{item.class.name}</td>
              <td className="px-6 py-4 text-sm text-gray-700 border-b border-none" style={{ backgroundColor: theme[0]?.primary as string }}>{item.class_id}</td>
              <td className="px-6 py-4 text-sm text-gray-700 border-b border-none" style={{ backgroundColor: theme[0]?.primary as string }}>{askedMeData[index]?.question ?? 'N/A'}</td>
              <td className="px-6 py-4 text-sm text-gray-700 border-b border-none" style={{ backgroundColor: theme[0]?.primary as string }}>{askedMeData[index]?.search_text ?? 'N/A'}</td>
            </tr>
          ))}


        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementListPage;
