import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Buttons from "./Buttons";

// Mock Button component if it has complex functionality that doesn't need testing here
jest.mock("./Button", () =>
    // eslint-disable-next-line react/display-name
    ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
        <button onClick={onClick}>{children}</button>
    )
);

describe("Buttons Component", () => {
    test("renders initial state correctly", () => {
        render(<Buttons />);
        expect(screen.getByText("Clicked 0 time.")).toBeInTheDocument();
        expect(screen.getByText("button 1")).toBeInTheDocument();
        expect(screen.getByText("button 2")).toBeInTheDocument();
        expect(screen.getByText("button 3")).toBeInTheDocument();
    });

    test("updates message when buttons are clicked", () => {
        render(<Buttons />);

        const button1 = screen.getByText("button 1");
        const button2 = screen.getByText("button 2");
        const button3 = screen.getByText("button 3");

        // Click button 1
        fireEvent.click(button1);
        expect(screen.getByText("Clicked 1 times.")).toBeInTheDocument();

        // Click button 2
        fireEvent.click(button2);
        expect(screen.getByText("Clicked 2 times.")).toBeInTheDocument();

        // Click button 3
        fireEvent.click(button3);
        expect(screen.getByText("Clicked 3 times.")).toBeInTheDocument();
    });
});
