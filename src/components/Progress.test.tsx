import React from "react";
import { render } from "@testing-library/react";
import Progress from "./Progress";

describe("Progress Component", () => {
    it("should render with the correct value", () => {
        const value = 50;
        const { getByRole } = render(<Progress value={value} />);
        const progressBar = getByRole("progressbar");

        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveStyle(`--value: ${value}`);
        expect(progressBar).toHaveTextContent(`${value}%`);
    });

    it("should render with the correct value at 0", () => {
        const value = 0;
        const { getByRole } = render(<Progress value={value} />);
        const progressBar = getByRole("progressbar");

        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveStyle(`--value: ${value}`);
        expect(progressBar).toHaveTextContent(`${value}%`);
    });

    it("should render with the correct value at 100", () => {
        const value = 100;
        const { getByRole } = render(<Progress value={value} />);
        const progressBar = getByRole("progressbar");

        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveStyle(`--value: ${value}`);
        expect(progressBar).toHaveTextContent(`${value}%`);
    });

    it("should match snapshot", () => {
        const value = 50;
        const { asFragment } = render(<Progress value={value} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
