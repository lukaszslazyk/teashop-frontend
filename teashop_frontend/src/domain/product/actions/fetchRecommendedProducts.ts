import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
import { Product, recommendedProductsCategoryName } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_RECOMMENDED_PRODUCTS = "REQUEST_RECOMMENDED_PRODUCTS";
export const RECEIVE_RECOMMENDED_PRODUCTS = "RECEIVE_RECOMMENDED_PRODUCTS";

interface RequestRecommendedProductsAction {
    type: typeof REQUEST_RECOMMENDED_PRODUCTS;
}

interface ReceiveRecommendedProductsAction {
    type: typeof RECEIVE_RECOMMENDED_PRODUCTS;
    products: Product[];
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

export type FetchRecommendedProductsActionTypes =
    | RequestRecommendedProductsAction
    | ReceiveRecommendedProductsAction;

export const requestRecommendedProducts = (): FetchRecommendedProductsActionTypes => ({
    type: REQUEST_RECOMMENDED_PRODUCTS,
});

export const receiveRecommendedProducts = (
    products: Product[],
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): FetchRecommendedProductsActionTypes => ({
    type: RECEIVE_RECOMMENDED_PRODUCTS,
    products: products,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveRecommendedProductsError = (
    errorType: ApiErrorType
): FetchRecommendedProductsActionTypes => ({
    type: RECEIVE_RECOMMENDED_PRODUCTS,
    products: [],
    errorOccurred: true,
    errorType: errorType,
});

export const fetchRecommendedProducts = (
    numberOfProducts: number,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestRecommendedProducts());
    await axios
        .get(prepareApiUrl(numberOfProducts), {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response =>
            dispatch(receiveRecommendedProducts(response.data.products))
        )
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(
                        receiveRecommendedProductsError(ApiErrorType.Timeout)
                    );
                else
                    dispatch(
                        receiveRecommendedProductsError(ApiErrorType.Unexpected)
                    );
        });
};

const prepareApiUrl = (numberOfProducts: number) =>
    `${API_ROOT}/products` +
    `?categoryName=${recommendedProductsCategoryName}` +
    "&pageIndex=0" +
    `&pageSize=${numberOfProducts}`;
