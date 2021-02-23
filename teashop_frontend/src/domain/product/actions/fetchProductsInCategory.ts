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
    sortOptionName?: string;
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
    sortOptionName?: string,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None,
): FetchProductsInCategoryActionTypes => ({
    type: RECEIVE_PRODUCTS_IN_CATEGORY,
    products: products,
    pagesInTotal: pagesInTotal,
    errorOccurred: errorOccurred,
    errorType: errorType,
    sortOptionName: sortOptionName,
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
    cancelToken: RequestCancelToken,
    sortOptionName?: string
): AppThunk<void> => async dispatch => {
    dispatch(requestProductsInCategory());
    await axios
        .get(prepareUrl(categoryName, pageIndex, pageSize, sortOptionName), {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response =>
            dispatch(
                receiveProductsInCategory(
                    response.data.products,
                    response.data.pagesInTotal,
                    sortOptionName
                )
            )
        )
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(
                        receiveProductsInCategoryError(ApiErrorType.Timeout)
                    );
                else if (error.response.status === 404)
                    dispatch(
                        receiveProductsInCategoryError(
                            ApiErrorType.InvalidResponse
                        )
                    );
                else
                    dispatch(
                        receiveProductsInCategoryError(ApiErrorType.Unexpected)
                    );
        });
};

const prepareUrl = (
    categoryName: string,
    pageIndex: number,
    pageSize: number,
    sortOptionName?: string
) =>
    `${API_ROOT}/products` +
    `?categoryName=${categoryName}` +
    `&pageIndex=${pageIndex}` +
    `&pageSize=${pageSize}` +
    `${sortOptionName ? `&orderBy=${sortOptionName}` : ""}`;
