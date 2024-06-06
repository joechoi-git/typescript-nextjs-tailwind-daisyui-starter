"use client";

import * as React from "react";

interface Props {
    children?: React.ReactNode;
    [x: string]: any;
}

export default function Button({ children, ...rest }: Props): React.JSX.Element {
    return (
        <button className="btn btn-primary" {...rest}>
            {children}
        </button>
    );
}
