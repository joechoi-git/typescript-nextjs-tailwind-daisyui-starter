import React from "react";
import { render, waitFor } from "@testing-library/react";
import Wrapper from "./Wrapper";
import { ThemeContext, Theme } from "../context/ThemeContext";

// Mock the ThemeSwitcher component
// eslint-disable-next-line react/display-name
jest.mock("../components/ThemeSwitcher", () => () => <div data-testid="theme-switcher"></div>);

const renderWithContext = (theme: Theme, children: React.ReactNode) => {
    const originalError = console.error;
    console.error = (...args) => {
        if (
            /validateDOMNesting/.test(args[0]) ||
            /createRoot\(\): Creating roots directly with document.body is discouraged/.test(
                args[0]
            )
        ) {
            return;
        }
        originalError.call(console, ...args);
    };

    const result = render(
        <ThemeContext.Provider value={{ theme, setTheme: jest.fn() }}>
            <Wrapper>{children}</Wrapper>
        </ThemeContext.Provider>
    );

    console.error = originalError;
    return result;
};

describe("Wrapper", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = ""; // Clear any previous content
        document.body.style.display = ""; // Reset display style
        document.body.removeAttribute("data-theme"); // Remove any data-theme attributes
    });

    it("sets body display style to block on theme change", () => {
        renderWithContext("dark", <div>Some Content</div>);
        expect(document.body.style.display).toBe("block");
    });

    it("applies the correct theme data attribute", async () => {
        const { container, rerender } = renderWithContext("dark", <div>Some Content</div>);
        await waitFor(() => {
            const bodyElement = container.querySelector("body");
            expect(bodyElement).toHaveAttribute("data-theme", "dark");
        });

        rerender(
            <ThemeContext.Provider value={{ theme: "light", setTheme: jest.fn() }}>
                <Wrapper>Some Content</Wrapper>
            </ThemeContext.Provider>
        );
        await waitFor(() => {
            const bodyElement = container.querySelector("body");
            expect(bodyElement).toHaveAttribute("data-theme", "light");
        });
    });

    it("renders the ThemeSwitcher component", () => {
        const { getByTestId } = renderWithContext("light", <div>Some Content</div>);
        expect(getByTestId("theme-switcher")).toBeInTheDocument();
    });

    it("renders children content", () => {
        const { getByText } = renderWithContext("light", <div>Some Content</div>);
        expect(getByText("Some Content")).toBeInTheDocument();
    });

    it("renders the navigation bar", () => {
        const { container } = renderWithContext("light", <div>Some Content</div>);
        const nav = container.querySelector("nav");
        expect(nav).toBeInTheDocument();
    });

    it("renders the footer", () => {
        const { container } = renderWithContext("light", <div>Some Content</div>);
        const footer = container.querySelector("footer");
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveTextContent("Copyright Reserved by Joe Choi");
    });

    it("matches the snapshot", () => {
        const { asFragment } = renderWithContext("light", <div>Some Content</div>);
        expect(asFragment()).toMatchSnapshot();
    });
});
