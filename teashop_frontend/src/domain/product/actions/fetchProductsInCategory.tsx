import axios from "axios";
import { AppThunk } from "../../../shared/types";
import { CancelToken } from "../../../shared/utils/cancelToken";
import { Product } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_PRODUCTS_IN_CATEGORY = "REQUEST_PRODUCTS_IN_CATEGORY";
export const RECEIVE_PRODUCTS_IN_CATEGORY = "RECEIVE_PRODUCTS_IN_CATEGORY";

interface RequestProductsInCategoryAction {
    type: typeof REQUEST_PRODUCTS_IN_CATEGORY;
}

interface ReceiveProductsInCategoryAction {
    type: typeof RECEIVE_PRODUCTS_IN_CATEGORY;
    products: Product[];
    errorOccurred: boolean;
}

export type FetchProductsInCategoryActionTypes =
    | RequestProductsInCategoryAction
    | ReceiveProductsInCategoryAction;

export const requestProductsInCategory = (): FetchProductsInCategoryActionTypes => ({
    type: REQUEST_PRODUCTS_IN_CATEGORY,
});

export const receiveProductsInCategory = (
    products: Product[],
    errorOccurred: boolean = false
): FetchProductsInCategoryActionTypes => ({
    type: RECEIVE_PRODUCTS_IN_CATEGORY,
    products: products,
    errorOccurred: errorOccurred,
});

export const fetchProductsInCategory = (
    categoryName: string,
    cancelToken: CancelToken
): AppThunk<void> => {
    return async (dispatch) => {
        dispatch(requestProductsInCategory());
        await axios
            .get(`${API_ROOT}/products/categories/${categoryName}`, {
                cancelToken: cancelToken.tokenSource.token,
            })
            .then((response) =>
                dispatch(receiveProductsInCategory(response.data))
            )
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.error("Error occurred during fetching products");
                    dispatch(receiveProductsInCategory([], true));
                }
            });
    };
};
