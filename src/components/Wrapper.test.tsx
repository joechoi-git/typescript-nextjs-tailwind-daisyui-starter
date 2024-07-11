import React from "react";
import { render } from "@testing-library/react";
import Wrapper from "./Wrapper";
import { ThemeContext, Theme } from "../context/ThemeContext";

// Mock the ThemeSwitcher component
// eslint-disable-next-line react/display-name
jest.mock("./ThemeSwitcher", () => () => <div data-testid="theme-switcher"></div>);

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
        </ThemeContext.Provider>,
        { container: document.body }
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

    it("matches the snapshot", () => {
        const { asFragment } = renderWithContext("light", <div>Some Content</div>);
        expect(asFragment()).toMatchSnapshot();
    });
});
