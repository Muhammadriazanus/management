"use client";
import axios from "axios";
import { METHODS } from "http";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { string } from "zod";
// import { useEffect } from "react";

const Navbar = () => {
  const [logoutUser , setLogoutUser] = useState<any>(null)
  const router = useRouter()
//  logout button

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/logout",{method : "POST"});
      localStorage.removeItem("token")
      console.log("🚀 ~ handleLogout ~ response:", response.data)
      console.log("🚀 ~ handleLogout ~ response:", response.data)
      setLogoutUser(response.data)
      
      alert("Logged out successfully");
      router.push("/sign-in")
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
       {/* <span className="text-xs leading-3 font-medium">{logoutUser.user.username}</span>  */}
        </div>
          <button onClick={handleLogout} className="text-black-500">Logout</button>
        
      </div>
    </div>
  );
};

export default Navbar;
