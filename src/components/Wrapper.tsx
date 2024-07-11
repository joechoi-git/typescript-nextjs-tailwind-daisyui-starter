"use client";

import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { ThemeContext } from "../context/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

interface Props {
    children: React.ReactNode;
}

export default function Wrapper({ children }: Props): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext);

    // to remove the flickering effect when loading a theme
    useEffect(() => {
        document.body.style.display = "block";
    }, [theme]);

    return (
        <body
            data-theme={theme}
            style={{ display: "none" }}
            className={"min-h-screen overflow-x-hidden " + inter.className}
        >
            <nav className="flex">
                Navigation
                <ThemeSwitcher />
            </nav>
            <main className="min-h-[300px] pl-4 pr-4 md:pl-10 md:pr-10">{children}</main>
            <footer>Footer</footer>
        </body>
    );
}
