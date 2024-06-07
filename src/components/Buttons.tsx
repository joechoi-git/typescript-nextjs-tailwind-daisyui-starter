"use client";

import React from "react";
import Button from "./Button";

export default function Buttons(): React.JSX.Element {
    const [clicked, setClicked] = React.useState(0);
    const [message, setMessage] = React.useState("Clicked 0 time.");
    const handleClick = () => {
        setMessage(`Clicked ${clicked + 1} times.`);
        setClicked(clicked + 1);
    };
    return (
        <section className="p-4">
            <p>{message}</p>
            <div className="flex justify-center w-full py-2 gap-2">
                <Button onClick={handleClick}>button 1</Button>
                <Button onClick={handleClick}>button 2</Button>
                <Button onClick={handleClick}>button 3</Button>
            </div>
        </section>
    );
}
