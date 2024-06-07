import React from "react";
import { useTheme } from "../context/ThemeContext.backup";

const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"} theme
        </button>
    );
};

export default ThemeSwitcher;
