"use client";

import * as React from "react";

type Props = {
    children?: React.ReactNode;
};

type Theme = "system" | "light" | "dark" | "cupcake";

type IAuthContext = {
    theme: Theme;
    // eslint-disable-next-line no-unused-vars
    setTheme: (arg: Theme) => void;
};

const ThemeContext = React.createContext<IAuthContext>({
    theme: "system",
    setTheme: () => {}
});

const ThemeProvider = ({ children }: Props) => {
    // initialize context with cookie values
    const [theme, setTheme] = React.useState<Theme>("system");

    React.useEffect(() => {
        let savedTheme: Theme = localStorage.getItem("theme") as Theme;
        if (!savedTheme || savedTheme === "system") {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                savedTheme = "dark";
            } else {
                savedTheme = "light";
            }
        }
        setTheme(savedTheme);
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
export type { Theme };
