import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import renderer from "react-test-renderer";
import Button from "./Button";

describe("Button component", () => {
    // eslint-disable-next-line jest/expect-expect
    it("renders without crashing", () => {
        render(<Button />);
    });

    it("Matches DOM Snapshot", () => {
        const domTree = renderer.create(<Button />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

    it("renders with children text", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("applies the className correctly", () => {
        render(<Button className="custom-class">Click me</Button>);
        const buttonElement = screen.getByText("Click me");
        expect(buttonElement).toHaveClass("btn btn-primary custom-class");
    });

    it("passes other props correctly", () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Click me</Button>);
        const buttonElement = screen.getByText("Click me");
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalled();
    });

    it("renders correctly with additional attributes", () => {
        render(<Button data-testid="custom-button">Click me</Button>);
        const buttonElement = screen.getByTestId("custom-button");
        expect(buttonElement).toBeInTheDocument();
    });
});
