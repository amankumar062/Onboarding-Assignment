import { render } from "@testing-library/react";
import LoadingIcon from "./LoadingIcon";


describe("loadingIcon Component", () => {
    it("render loadingIcon component", () => {
        const { getByTestId } = render(<LoadingIcon/>);
        const loadingComponent = getByTestId("loadingIcon");
        expect(loadingComponent).toBeTruthy();
    });
});
