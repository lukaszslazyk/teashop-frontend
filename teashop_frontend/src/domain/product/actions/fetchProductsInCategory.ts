import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
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
    pagesInTotal: number;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

export type FetchProductsInCategoryActionTypes =
    | RequestProductsInCategoryAction
    | ReceiveProductsInCategoryAction;

export const requestProductsInCategory = (): FetchProductsInCategoryActionTypes => ({
    type: REQUEST_PRODUCTS_IN_CATEGORY,
});

export const receiveProductsInCategory = (
    products: Product[],
    pagesInTotal: number,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): FetchProductsInCategoryActionTypes => ({
    type: RECEIVE_PRODUCTS_IN_CATEGORY,
    products: products,
    pagesInTotal: pagesInTotal,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveProductsInCategoryError = (
    errorType: ApiErrorType
): FetchProductsInCategoryActionTypes => ({
    type: RECEIVE_PRODUCTS_IN_CATEGORY,
    products: [],
    pagesInTotal: 0,
    errorOccurred: true,
    errorType: errorType,
});

export const fetchProductsInCategory = (
    categoryName: string,
    pageIndex: number,
    pageSize: number,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestProductsInCategory());
    await axios
        .get(`${API_ROOT}/products/categories/${categoryName}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response =>
            dispatch(
                receiveProductsInCategory(
                    response.data.products,
                    response.data.pagesInTotal
                )
            )
        )
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(
                        receiveProductsInCategoryError(ApiErrorType.Timeout)
                    );
                else
                    dispatch(
                        receiveProductsInCategoryError(ApiErrorType.Unexpected)
                    );
        });
};
