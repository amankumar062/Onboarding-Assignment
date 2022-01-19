import { act, render, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login Component", () => {
    it("render Login component", () => {
        const { getByTestId } = render(<Login />);
        const loginComponent = getByTestId("loginComponent");
        expect(loginComponent).toBeTruthy();
    });
});
