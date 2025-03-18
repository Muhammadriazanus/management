 "use client"
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
type ThemeType = {
    primary: String;
    secondary: String;
    background: String
    surface: String;
    text: String;
    border: String;
    color: String
}
const defaultTheme: ThemeType = {
    primary: "#4CAF50",
    secondary: "#FFC107",
    background: "#4CAF50",
    surface: "#FFFFFF",
    text: "#333333",
    border: "#E0E0E0",
    color: "#FFFFFF"
};// export const ThemeContext = React.createContext<themeContextType | null>(null);
const ThemeContext = createContext<ThemeType>(defaultTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>(defaultTheme)
    useEffect(() => {
        const theme_handler = async () => {
            try {
                const res = await axios?.get("/api/v1/colormodel")
                // console.log("🚀 ~ consttheme_handler=async ~ res:", res?.data)
                setTheme(res?.data)
            } catch (error) {
                console.log("🚀 ~ consttheme_handler=async ~ error:", error)
            }
        }
        theme_handler()
    }, [])

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeContext