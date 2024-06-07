import React from "react";
import { ThemeContext, Theme } from "../context/ThemeContext";
import { setCookie } from "../utils/Cookies";

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);

    const handleSetTheme = (newTheme: Theme): void => {
        console.log("handleSetTheme", newTheme);
        setTheme(newTheme);
        setCookie("theme", newTheme);
    };

    return (
        <select value={theme} onChange={(e) => handleSetTheme(e.target.value as Theme)}>
            <option value="cupcake">Cupcake</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
        </select>
    );
};

export default ThemeSwitcher;
