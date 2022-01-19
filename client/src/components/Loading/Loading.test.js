import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
    it("render Loading component", () => {
        const { getByTestId } = render(<Loading />);
        const loadingComponent = getByTestId("loadingComponent");
        expect(loadingComponent).toBeTruthy();
    });
});
