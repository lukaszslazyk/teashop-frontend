import axios from "axios";
import { AppThunk } from "../common/types";
import { Product } from "./models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const RECEIVE_ALL_PRODUCTS = "RECEIVE_ALL_PRODUCTS";

interface RequestAllProductsAction {
    type: typeof REQUEST_ALL_PRODUCTS;
}

interface ReceiveAllProductsAction {
    type: typeof RECEIVE_ALL_PRODUCTS;
    products: Product[];
    error: boolean;
}

export type ProductActionTypes =
    | RequestAllProductsAction
    | ReceiveAllProductsAction;

export const requestAllProducts = (): ProductActionTypes => ({
    type: REQUEST_ALL_PRODUCTS,
});

export const receiveAllProducts = (
    products: Product[],
    error: boolean = false
): ProductActionTypes => ({
    type: RECEIVE_ALL_PRODUCTS,
    products: products,
    error: error,
});

export const fetchAllProducts = (): AppThunk<void> => {
    return async (dispatch) => {
        dispatch(requestAllProducts());
        await axios
            .get(`${API_ROOT}/products`)
            .then(response => dispatch(receiveAllProducts(response.data)))
            .catch(error => dispatch(receiveAllProducts([], true)));
    };
};
