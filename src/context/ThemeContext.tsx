"use client";

import * as React from "react";
import { getCookie } from "../utils/Cookies";

type Props = {
    children?: React.ReactNode;
};

type Theme = "light" | "dark" | "";

type IAuthContext = {
    theme: Theme;
    setTheme: (newState: Theme) => void;
};

const ThemeContext = React.createContext<IAuthContext>({
    theme: "dark",
    setTheme: () => {}
});

const ThemeProvider = ({ children }: Props) => {
    // initialize with cookie
    const savedTheme: Theme = getCookie("theme") as Theme;

    // initialize context with cookie values
    const [theme, setTheme] = React.useState(savedTheme);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
