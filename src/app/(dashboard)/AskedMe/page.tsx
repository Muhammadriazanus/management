"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import Image from "next/image";
import TableSearch from "@/components/TableSearch";
interface AskedMe {
    id: String;
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
const SearchTable = () => {
    const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
    const [ColorTheme, setColorTheme] = useState<ColorThememodel[]>([]);
    useEffect(() => {
        const AskedMeDataInput = async () => {
            try {
                const respone = await axios.get('/page/api/GetAskedMe')
                console.log("🚀 ~ AskedMeDataInput ~ respone:", respone.data)
                setAskedMeData(respone.data)

            } catch (error) {
                console.log(error);

            }
        }
        AskedMeDataInput()
    }, [])

    useEffect(() => {
        const ColorThemes = async () => {
            try {
                const response = await axios.get('/page/api/colormodel')
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
        <div style={{ backgroundColor: ColorTheme[0]?.surface as string }}>
            <div className="flex items-center justify-between text-white">
                <h1 className="hidden md:block text-lg font-semibold ml-4">All Attendance</h1>
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
            <table className="min-w-full border border-gray-200 rounded-lg my-4">
                <thead>
                    <tr className="bg-gray-100" style={{ backgroundColor: ColorTheme[0]?.text as string, border: ColorTheme[0]?.border as string }}>
                        <th className="px-6 py-3 text-left text-sm font-medium text-white  uppercase border-b">Question</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-white  uppercase border-b">SearchText</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-white  uppercase border-b">End Time</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-white  uppercase border-b">Start Time</th>
                    </tr>
                </thead>
                <tbody>
                    {askedMeData.map((item, id) => (
                        <tr key={id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string , border:ColorTheme[0]?.border as string}}>{item.question}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string , border:ColorTheme[0]?.border as string}}>{item.search_text}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string , border:ColorTheme[0]?.border as string}}>{item.start_time}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 border-b" style={{ backgroundColor: ColorTheme[0]?.primary as string, color: ColorTheme[0]?.color as string , border:ColorTheme[0]?.border as string}}>{item.end_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default SearchTable
