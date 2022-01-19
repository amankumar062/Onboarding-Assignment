import { act, render, fireEvent, screen } from "@testing-library/react";
import Product from "./Product";

describe("Product Component", () => {
    it("render Product component", () => {
        const testData = {
            id: "283",
            popularity: "105",
            price: "500",
            subcategory: "Laptop",
            title: "Acer",
        };

        const { getByTestId } = render(
            <Product
                status="true"
                data={testData}
                updataData="true"
                user="test user"
            />
        );
        const productComponent = getByTestId("productComponent");
        expect(productComponent).toBeTruthy();
    });
});
