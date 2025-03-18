import { useContext, useEffect } from "react";

// import  from "./context/themeContext";
import ThemeContext from "./context/themeContext";
export const themeUpdater = () => {
    const theme = useContext(ThemeContext)
    useEffect(() => {
        if (theme.primary) {
            document.documentElement.style.setProperty("--primary", theme.primary as string);
            document.documentElement.style.setProperty("--secondary", theme.secondary as string);
            document.documentElement.style.setProperty("--background", theme.background as string);
            document.documentElement.style.setProperty("--textColor", theme.text as string);
            document.documentElement.style.setProperty("--textColor", theme.surface as string);
        }

    }, [theme])
    return null
}