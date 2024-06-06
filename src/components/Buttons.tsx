"use client";

import React from "react";
import Button from "./Button";

export default function Buttons(): React.JSX.Element {
    const [clicked, setClicked] = React.useState(0);
    /*
    const handleClick = () => {
        console.log("button is clicked", clicked + 1);
        setClicked(clicked + 1);
    }; */
    return (
        <section>
            <Button
                onClick={() => {
                    console.log("button is clicked", clicked + 1);
                    setClicked(clicked + 1);
                }}
            >
                button 1
            </Button>
            <Button>button 2</Button>
            <Button>button 3</Button>
        </section>
    );
}
