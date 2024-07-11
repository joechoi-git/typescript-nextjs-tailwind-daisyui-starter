import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

// Mock the dynamic import for Grid component
jest.mock("next/dynamic", () => {
    return jest.fn().mockImplementation((importCallback, options) => {
        const Component = importCallback();
        Component.displayName = "Grid";
        return function DynamicComponent(props: React.JSX.IntrinsicAttributes) {
            if (options?.loading) {
                return options.loading();
            }
            return <Component {...props} />;
        };
    });
});

// eslint-disable-next-line react/display-name
jest.mock("next/image", () => (props: { src: string; alt: string; [key: string]: any }) => {
    const { src, alt, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...rest} />;
});

describe("Home", () => {
    it("renders the article content", () => {
        render(<Home />);
        expect(
            screen.getByText("Garlic bread with cheese: What the science tells us")
        ).toBeInTheDocument();
        expect(screen.getByText(/For years parents have espoused/i)).toBeInTheDocument();
        expect(screen.getByText(/But a recent study shows/i)).toBeInTheDocument();
    });

    it("renders the Buttons component", () => {
        render(<Home />);
        expect(screen.getByText("button 1")).toBeInTheDocument();
    });

    it("renders the Grid component", () => {
        render(<Home />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders the Progress components", () => {
        render(<Home />);
        expect(screen.getByText("0%")).toBeInTheDocument();
        expect(screen.getByText("20%")).toBeInTheDocument();
        expect(screen.getByText("40%")).toBeInTheDocument();
        expect(screen.getByText("60%")).toBeInTheDocument();
        expect(screen.getByText("80%")).toBeInTheDocument();
        expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("renders the carousel images", () => {
        render(<Home />);
        expect(screen.getByAltText("1")).toBeInTheDocument();
        expect(screen.getByAltText("2")).toBeInTheDocument();
        expect(screen.getByAltText("3")).toBeInTheDocument();
        expect(screen.getByAltText("4")).toBeInTheDocument();
    });

    it("renders the carousel navigation buttons", () => {
        render(<Home />);
        expect(screen.getAllByRole("link", { name: "1" })).toHaveLength(1);
        expect(screen.getAllByRole("link", { name: "2" })).toHaveLength(1);
        expect(screen.getAllByRole("link", { name: "3" })).toHaveLength(1);
        expect(screen.getAllByRole("link", { name: "4" })).toHaveLength(1);
    });

    it("renders the table with correct data", () => {
        render(<Home />);
        expect(screen.getByText("Cy Ganderton")).toBeInTheDocument();
        expect(screen.getByText("Hart Hagerty")).toBeInTheDocument();
        expect(screen.getByText("Brice Swyre")).toBeInTheDocument();
    });

    it("matches the snapshot", () => {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    });
});
