import axios from "axios";
import { AppThunk } from "../../common/types";
import { Product } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_PRODUCT_BY_ID = "REQUEST_PRODUCT_BY_ID";
export const RECEIVE_PRODUCT_BY_ID = "RECEIVE_PRODUCT_BY_ID";

interface RequestProductByIdAction {
    type: typeof REQUEST_PRODUCT_BY_ID;
}

interface ReceiveProductByIdAction {
    type: typeof RECEIVE_PRODUCT_BY_ID;
    product: Product | null;
    error: boolean;
}

export type FetchProductByIdActionTypes =
    | RequestProductByIdAction
    | ReceiveProductByIdAction;

export const requestProductById = (): FetchProductByIdActionTypes => ({
    type: REQUEST_PRODUCT_BY_ID,
});

export const receiveProductById = (
    product: Product | null,
    error: boolean = false
): FetchProductByIdActionTypes => ({
    type: RECEIVE_PRODUCT_BY_ID,
    product: product,
    error: error,
});

export const fetchProductById = (productId: string): AppThunk<void> => {
    return async (dispatch) => {
        dispatch(requestProductById());
        await axios
            .get(`${API_ROOT}/products/${productId}`)
            .then((response) => dispatch(receiveProductById(response.data)))
            .catch((error) => {
                console.error("Error occurred during fetching product");
                dispatch(receiveProductById(null, true));
            });
    };
};
