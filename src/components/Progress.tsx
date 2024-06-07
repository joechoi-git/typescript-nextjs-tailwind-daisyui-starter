import * as React from "react";

export default function Progress(): React.JSX.Element {
    return (
        <section>
            <div
                className="radial-progress"
                style={{ "--value": 0 } as React.CSSProperties}
                role="progressbar"
            >
                0%
            </div>
            <div
                className="radial-progress"
                style={{ "--value": 20 } as React.CSSProperties}
                role="progressbar"
            >
                20%
            </div>
            <div
                className="radial-progress"
                style={{ "--value": 60 } as React.CSSProperties}
                role="progressbar"
            >
                60%
            </div>
            <div
                className="radial-progress"
                style={{ "--value": 80 } as React.CSSProperties}
                role="progressbar"
            >
                80%
            </div>
            <div
                className="radial-progress"
                style={{ "--value": 100 } as React.CSSProperties}
                role="progressbar"
            >
                100%
            </div>
        </section>
    );
}
