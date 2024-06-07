import React from "react";
import { ThemeContext, Theme } from "../context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);
    const savedTheme: Theme | undefined =
        typeof window !== "undefined" ? (localStorage.getItem("theme") as Theme) : undefined;

    const handleSetTheme = (newTheme: Theme): void => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <select
            value={savedTheme ? savedTheme : theme}
            onChange={(e) => handleSetTheme(e.target.value as Theme)}
        >
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="cupcake">Cupcake</option>
        </select>
    );
};

export default ThemeSwitcher;
