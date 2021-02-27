import { ApiErrorType } from "../../shared/types";
import {
    CHOOSE_SORT_OPTION,
    ProductActionTypes,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE,
    RECEIVE_PRODUCT_BY_PRODUCT_NUMBER,
    RECEIVE_RECOMMENDED_PRODUCTS,
    REQUEST_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCTS_WITH_SEARCH_PHRASE,
    REQUEST_PRODUCT_BY_PRODUCT_NUMBER,
    REQUEST_RECOMMENDED_PRODUCTS,
} from "./actions";
import { Product, productsSortOptions } from "./models";

export interface ProductState {
    products: Product[];
    recommendedProducts: Product[];
    product: Product | null;
    pagesInTotal: number;
    totalCount: number;
    isFetching: boolean;
    errorOccurred: boolean;
    errorType: ApiErrorType;
    chosenSortOptionName: string;
    lastSuccessfullyFetchedProductsUrl: string;
}

const initialState: ProductState = {
    products: [],
    recommendedProducts: [],
    product: null,
    pagesInTotal: 0,
    totalCount: 0,
    isFetching: false,
    errorOccurred: false,
    errorType: ApiErrorType.None,
    chosenSortOptionName: productsSortOptions[0].name,
    lastSuccessfullyFetchedProductsUrl: "",
};

export const productReducer = (
    state = initialState,
    action: ProductActionTypes
): ProductState => {
    switch (action.type) {
        case REQUEST_PRODUCTS_IN_CATEGORY:
        case REQUEST_RECOMMENDED_PRODUCTS:
        case REQUEST_PRODUCTS_WITH_SEARCH_PHRASE:
        case REQUEST_PRODUCT_BY_PRODUCT_NUMBER:
            return {
                ...state,
                isFetching: true,
                errorOccurred: false,
                errorType: ApiErrorType.None,
            };
        case RECEIVE_PRODUCTS_IN_CATEGORY:
            let receiveProductsInCategoryState = {
                ...state,
                isFetching: false,
                products: action.products,
                pagesInTotal: action.pagesInTotal,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
            if (
                !action.errorOccurred &&
                action.sortOptionName &&
                action.sortOptionName !== state.chosenSortOptionName
            )
                receiveProductsInCategoryState = {
                    ...receiveProductsInCategoryState,
                    chosenSortOptionName: action.sortOptionName,
                };
            if (!action.errorOccurred)
                receiveProductsInCategoryState = {
                    ...receiveProductsInCategoryState,
                    lastSuccessfullyFetchedProductsUrl: action.url,
                };
            return receiveProductsInCategoryState;
        case RECEIVE_RECOMMENDED_PRODUCTS:
            let receiveRecommendedProductsState = {
                ...state,
                isFetching: false,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
            if (!action.errorOccurred)
                receiveRecommendedProductsState = {
                    ...receiveRecommendedProductsState,
                    recommendedProducts: action.products,
                };
            return receiveRecommendedProductsState;
        case RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE:
            let receiveProductsWithSearchPhraseState = {
                ...state,
                isFetching: false,
                products: action.products,
                pagesInTotal: action.pagesInTotal,
                totalCount: action.totalCount,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
            if (!action.errorOccurred)
                receiveProductsWithSearchPhraseState = {
                    ...receiveProductsWithSearchPhraseState,
                    lastSuccessfullyFetchedProductsUrl: action.url,
                };
            return receiveProductsWithSearchPhraseState;
        case RECEIVE_PRODUCT_BY_PRODUCT_NUMBER:
            return {
                ...state,
                isFetching: false,
                product: action.product,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
        case CHOOSE_SORT_OPTION:
            return {
                ...state,
                chosenSortOptionName: action.sortOptionName,
            };
        default:
            return state;
    }
};
