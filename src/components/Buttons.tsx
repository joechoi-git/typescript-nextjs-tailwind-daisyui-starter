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
        <section>
            <p>{message}</p>
            <div className="flex">
                <Button onClick={handleClick}>button 1</Button>
                <Button onClick={handleClick}>button 2</Button>
                <Button onClick={handleClick}>button 3</Button>
            </div>
        </section>
    );
}
