import {
    ClearProductsActionTypes,
    CLEAR_PRODUCTS,
    clearProducts,
} from "./clearProducts";
import {
    FetchProductByIdActionTypes,
    RECEIVE_PRODUCT_BY_ID,
    REQUEST_PRODUCT_BY_ID,
    fetchProductById,
} from "./fetchProductById";
import {
    FetchProductsInCategoryActionTypes,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCTS_IN_CATEGORY,
    fetchProductsInCategory,
} from "./fetchProductsInCategory";
import {
    FetchProductsWithSearchPhraseActionTypes,
    REQUEST_PRODUCTS_WITH_SEARCH_PHRASE,
    RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE,
    fetchProductsWithSearchPhrase,
} from "./fetchProductsWithSearchPhrase";

export {
    fetchProductsInCategory,
    fetchProductsWithSearchPhrase,
    fetchProductById,
    clearProducts,
};

export {
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCTS_WITH_SEARCH_PHRASE,
    RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE,
    REQUEST_PRODUCT_BY_ID,
    RECEIVE_PRODUCT_BY_ID,
    CLEAR_PRODUCTS,
};

export type ProductActionTypes =
    | FetchProductsInCategoryActionTypes
    | FetchProductsWithSearchPhraseActionTypes
    | FetchProductByIdActionTypes
    | ClearProductsActionTypes;
