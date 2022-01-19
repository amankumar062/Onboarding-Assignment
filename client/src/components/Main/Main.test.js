import { act, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";

describe("Main Component", () => {
    it("render Main component", () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        );
        const mainComponent = getByTestId("mainComponent");
        expect(mainComponent).toBeTruthy();
    });

    // it("render Login Btn", () => {
    //     const { queryByTestId } = render(
    //         <BrowserRouter>
    //             <Main />
    //         </BrowserRouter>
    //     );
    //     // const logout = queryByTestId("logoutBtn");
    //     const login = queryByTestId("loginBtn");
    //     expect(login).toBeTruthy();

    //     // await fireEvent.click(button, )

    //     // act(() => {
    //     //     const { queryByTestId } = render(<Main />);
    //     //     const header = queryByTestId("header");
    //     //     expect(header).toBeTruthy();
    //     // });
    // });

    // it("on logout", async () => {
    //     await act(async () => {
    //         const { queryByTestId } = render(
    //             <BrowserRouter>
    //                 <Main />
    //             </BrowserRouter>
    //         );
    //         const button = queryByTestId("logoutBtn");

    //         // await fireEvent.click(button, )
    //     });

    //     // act(() => {
    //     //     const { queryByTestId } = render(<Main />);
    //     //     const header = queryByTestId("header");
    //     //     expect(header).toBeTruthy();
    //     // });
    // });
});
