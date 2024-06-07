/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import Buttons from "../components/Buttons";
import Progress from "../components/Progress";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Home() {
    const { theme } = React.useContext(ThemeContext);
    return (
        <main
            data-theme={theme}
            className="flex min-h-screen flex-col items-center justify-between p-24"
        >
            <ThemeSwitcher />
            <article className="prose">
                <h1>Garlic bread with cheese: What the science tells us</h1>
                <p>
                    For years parents have espoused the health benefits of eating garlic bread with
                    cheese to their children, with the food earning such an iconic status in our
                    culture that kids will often dress up as warm, cheesy loaf for Halloween.
                </p>
                <p>
                    But a recent study shows that the celebrated appetizer may be linked to a series
                    of rabies cases springing up around the country.
                </p>
                <Buttons />
            </article>

            <Progress />

            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
                        className="w-full"
                        alt="1"
                    />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                        className="w-full"
                        alt="2"
                    />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
                        className="w-full"
                        alt="3"
                    />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
                        className="w-full"
                        alt="4"
                    />
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">
                    1
                </a>
                <a href="#item2" className="btn btn-xs">
                    2
                </a>
                <a href="#item3" className="btn btn-xs">
                    3
                </a>
                <a href="#item4" className="btn btn-xs">
                    4
                </a>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}
