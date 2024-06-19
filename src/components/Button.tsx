import React from "react";

interface Props {
    children?: React.ReactNode;
    className?: string;
    [rest: string]: any;
}

export default function Button({ children, className, ...rest }: Props): React.JSX.Element {
    return (
        <button className={`btn btn-primary ${className ? className : ""}`} {...rest}>
            {children}
        </button>
    );
}
