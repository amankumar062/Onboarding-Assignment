import { act, render, fireEvent, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table Component", () => {
    it("render Table component", () => {
        const { getByTestId } = render(<Table loggedIn="true" />);
        const tableComponent = getByTestId("tableComponent");
        expect(tableComponent).toBeTruthy();
    });

    // it("when user loggedIn", async () => {
    //     await act( async () => {
    //         const { queryByTestId } = await render(<Table loggedIn="true" />);
    //         const loggedInHead = await queryByTestId("loggedInHead");
    //         expect(loggedInHead).toBeTruthy();
    //         // loggedInHead.dispatchEvent(new MouseEvent('click', {bubbles: true})); 
    //     });
    // })
});
