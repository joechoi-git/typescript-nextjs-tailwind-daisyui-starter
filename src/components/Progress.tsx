import * as React from "react";

interface ProgressProps {
    value: number;
}

export default function Progress({ value }: ProgressProps): React.JSX.Element {
    return (
        <section>
            <div
                className="radial-progress bg-primary text-primary-content border-4 border-primary"
                style={{ "--value": value } as React.CSSProperties}
                role="progressbar"
            >
                {value}%
            </div>
        </section>
    );
}
