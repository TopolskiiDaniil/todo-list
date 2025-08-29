import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe("Todo App", () => {
    it("adds a new todo", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("What needs to be done?");
        fireEvent.change(input, { target: { value: "Test task" } });
        fireEvent.submit(input);
        expect(screen.getByText("Test task")).toBeInTheDocument();
    });

    it("toggles todo as completed", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("What needs to be done?");
        fireEvent.change(input, { target: { value: "Check me" } });
        fireEvent.submit(input);

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);

        expect(screen.getByText("Check me")).toHaveClass("completed");
    });
});