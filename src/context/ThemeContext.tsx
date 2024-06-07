"use client";

import * as React from "react";
import { getCookie } from "../utils/Cookies";

type Props = {
    children?: React.ReactNode;
};

type Theme = "light" | "dark" | "";

type IAuthContext = {
    theme: Theme;
    // eslint-disable-next-line no-unused-vars
    setTheme: (arg: Theme) => void;
};

const ThemeContext = React.createContext<IAuthContext>({
    theme: "",
    setTheme: () => {}
});

const ThemeProvider = ({ children }: Props) => {
    // initialize with cookie
    // const savedTheme: Theme = getCookie("theme") as Theme;
    // console.log("ThemeProvider", savedTheme);

    // initialize context with cookie values
    const [theme, setTheme] = React.useState<Theme>("");

    React.useEffect(() => {
        const savedTheme: Theme = getCookie("theme") as Theme;
        console.log("ThemeProvider useEffect", savedTheme);
        setTheme(savedTheme);
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
