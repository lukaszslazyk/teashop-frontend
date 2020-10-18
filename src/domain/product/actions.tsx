import { GET_ALL_PRODUCTS, ProductActionTypes } from "./types";

export const getAllProducts = (): ProductActionTypes => ({
    type: GET_ALL_PRODUCTS,
});
