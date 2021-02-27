import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
import { Product } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_PRODUCTS_WITH_SEARCH_PHRASE =
    "REQUEST_PRODUCTS_WITH_SEARCH_PHRASE";
export const RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE =
    "RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE";

interface RequestProductsWithSearchPhraseAction {
    type: typeof REQUEST_PRODUCTS_WITH_SEARCH_PHRASE;
}

interface ReceiveProductsWithSearchPhraseAction {
    type: typeof RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE;
    products: Product[];
    pagesInTotal: number;
    totalCount: number;
    url: string;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

export type FetchProductsWithSearchPhraseActionTypes =
    | RequestProductsWithSearchPhraseAction
    | ReceiveProductsWithSearchPhraseAction;

export const requestProductsWithSearchPhrase = (): FetchProductsWithSearchPhraseActionTypes => ({
    type: REQUEST_PRODUCTS_WITH_SEARCH_PHRASE,
});

export const receiveProductsWithSearchPhrase = (
    products: Product[],
    pagesInTotal: number,
    totalCount: number,
    url: string,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): FetchProductsWithSearchPhraseActionTypes => ({
    type: RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE,
    products: products,
    pagesInTotal: pagesInTotal,
    totalCount: totalCount,
    url: url,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveProductsWithSearchPhraseError = (
    errorType: ApiErrorType
): FetchProductsWithSearchPhraseActionTypes => ({
    type: RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE,
    products: [],
    pagesInTotal: 0,
    totalCount: 0,
    url: "",
    errorOccurred: true,
    errorType: errorType,
});

export const fetchProductsWithSearchPhrase = (
    phrase: string,
    pageIndex: number,
    pageSize: number,
    cancelToken: RequestCancelToken,
    url: string,
    sortOptionName?: string
): AppThunk<void> => async dispatch => {
    dispatch(requestProductsWithSearchPhrase());
    await axios
        .get(prepareApiUrl(phrase, pageIndex, pageSize, sortOptionName), {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response =>
            dispatch(
                receiveProductsWithSearchPhrase(
                    response.data.products,
                    response.data.pagesInTotal,
                    response.data.totalCount,
                    url
                )
            )
        )
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(
                        receiveProductsWithSearchPhraseError(
                            ApiErrorType.Timeout
                        )
                    );
                else
                    dispatch(
                        receiveProductsWithSearchPhraseError(
                            ApiErrorType.Unexpected
                        )
                    );
        });
};

const prepareApiUrl = (
    phrase: string,
    pageIndex: number,
    pageSize: number,
    sortOptionName?: string
) =>
    `${API_ROOT}/products` +
    `?searchPhrase=${phrase}` +
    `&pageIndex=${pageIndex}` +
    `&pageSize=${pageSize}` +
    `${sortOptionName ? `&orderBy=${sortOptionName}` : ""}`;
