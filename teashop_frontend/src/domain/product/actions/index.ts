import {
    ClearProductsActionTypes,
    CLEAR_PRODUCTS,
    clearProducts,
} from "./clearProducts";
import {
    FetchProductByProductNumberActionTypes,
    REQUEST_PRODUCT_BY_PRODUCT_NUMBER,
    RECEIVE_PRODUCT_BY_PRODUCT_NUMBER,
    fetchProductByProductNumber,
} from "./fetchProductByProductNumber";
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
import {
    SortOptionsActionTypes,
    CHOOSE_SORT_OPTION,
    chooseSortOption,
} from "./sortOptions";

export {
    fetchProductsInCategory,
    fetchProductsWithSearchPhrase,
    fetchProductByProductNumber,
    clearProducts,
    chooseSortOption,
};

export {
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCTS_WITH_SEARCH_PHRASE,
    RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE,
    REQUEST_PRODUCT_BY_PRODUCT_NUMBER,
    RECEIVE_PRODUCT_BY_PRODUCT_NUMBER,
    CLEAR_PRODUCTS,
    CHOOSE_SORT_OPTION,
};

export type ProductActionTypes =
    | FetchProductsInCategoryActionTypes
    | FetchProductsWithSearchPhraseActionTypes
    | FetchProductByProductNumberActionTypes
    | ClearProductsActionTypes
    | SortOptionsActionTypes;
