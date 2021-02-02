import { ApiErrorType } from "../../shared/types";
import {
    CLEAR_PRODUCTS,
    ProductActionTypes,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE,
    RECEIVE_PRODUCT_BY_ID,
    REQUEST_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCTS_WITH_SEARCH_PHRASE,
    REQUEST_PRODUCT_BY_ID,
} from "./actions";
import { Product } from "./models";

export interface ProductState {
    products: Product[];
    product: Product | null;
    pagesInTotal: number;
    totalCount: number;
    isFetching: boolean;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

const initialState: ProductState = {
    products: [],
    product: null,
    pagesInTotal: 0,
    totalCount: 0,
    isFetching: false,
    errorOccurred: false,
    errorType: ApiErrorType.None,
};

export const productReducer = (
    state = initialState,
    action: ProductActionTypes
): ProductState => {
    switch (action.type) {
        case REQUEST_PRODUCTS_IN_CATEGORY:
        case REQUEST_PRODUCTS_WITH_SEARCH_PHRASE:
        case REQUEST_PRODUCT_BY_ID:
            return {
                ...state,
                isFetching: true,
                errorOccurred: false,
                errorType: ApiErrorType.None,
            };
        case RECEIVE_PRODUCTS_IN_CATEGORY:
            return {
                ...state,
                isFetching: false,
                products: action.products,
                pagesInTotal: action.pagesInTotal,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
        case RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE:
            return {
                ...state,
                isFetching: false,
                products: action.products,
                pagesInTotal: action.pagesInTotal,
                totalCount: action.totalCount,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
        case RECEIVE_PRODUCT_BY_ID:
            return {
                ...state,
                isFetching: false,
                product: action.product,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: [],
            };
        default:
            return state;
    }
};
