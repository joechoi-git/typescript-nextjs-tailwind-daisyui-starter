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
        <article className="prose">
            <h3>Switch Theme</h3>
            <select
                value={savedTheme ? savedTheme : theme}
                onChange={(e) => handleSetTheme(e.target.value as Theme)}
            >
                <option value="system">system</option>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="cupcake">Cupcake</option>
                <option value="bumblebee">bumblebee</option>
                <option value="emerald">emerald</option>
                <option value="corporate">corporate</option>
                <option value="synthwave">synthwave</option>
                <option value="retro">retro</option>
                <option value="cyberpunk">cyberpunk</option>
                <option value="valentine">valentine</option>
                <option value="halloween">halloween</option>
                <option value="garden">garden</option>
                <option value="forest">forest</option>
                <option value="aqua">aqua</option>
                <option value="lofi">lofi</option>
                <option value="pastel">pastel</option>
                <option value="fantasy">fantasy</option>
                <option value="wireframe">wireframe</option>
                <option value="black">black</option>
                <option value="luxury">luxury</option>
                <option value="dracula">dracula</option>
                <option value="cmyk">cmyk</option>
                <option value="autumn">autumn</option>
                <option value="business">business</option>
                <option value="acid">acid</option>
                <option value="lemonade">lemonade</option>
                <option value="night">night</option>
                <option value="coffee">coffee</option>
                <option value="winter">winter</option>
                <option value="dim">dim</option>
                <option value="nord">nord</option>
                <option value="sunset">sunset</option>
            </select>
        </article>
    );
};

export default ThemeSwitcher;
