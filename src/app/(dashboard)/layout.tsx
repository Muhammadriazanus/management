
"use client"

import ThemeContext from "@/components/context/themeContext";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FC, useContext } from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
  
const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {

  const theme = useContext(ThemeContext)
  console.log("🚀 ~ theme:", theme)
  return (
    <div className="h-screen flex" style={{background : theme[0]?.text as string}}>
      {/* LEFT: Sidebar */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">SchooLama</span>
        </Link>
        {/* <Menu userRole="teacher" /> Pass userRole prop here */}
        <Menu userRole="teacher" /> 
      </div>

      {/* RIGHT: Main Content Area */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
