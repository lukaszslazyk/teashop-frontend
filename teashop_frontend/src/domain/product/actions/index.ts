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
    FetchRecommendedProductsActionTypes,
    REQUEST_RECOMMENDED_PRODUCTS,
    RECEIVE_RECOMMENDED_PRODUCTS,
    fetchRecommendedProducts,
} from "./fetchRecommendedProducts";
import {
    SortOptionsActionTypes,
    CHOOSE_SORT_OPTION,
    chooseSortOption,
} from "./sortOptions";

export {
    fetchProductsInCategory,
    fetchRecommendedProducts,
    fetchProductsWithSearchPhrase,
    fetchProductByProductNumber,
    chooseSortOption,
};

export {
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    REQUEST_RECOMMENDED_PRODUCTS,
    RECEIVE_RECOMMENDED_PRODUCTS,
    REQUEST_PRODUCTS_WITH_SEARCH_PHRASE,
    RECEIVE_PRODUCTS_WITH_SEARCH_PHRASE,
    REQUEST_PRODUCT_BY_PRODUCT_NUMBER,
    RECEIVE_PRODUCT_BY_PRODUCT_NUMBER,
    CHOOSE_SORT_OPTION,
};

export type ProductActionTypes =
    | FetchProductsInCategoryActionTypes
    | FetchRecommendedProductsActionTypes
    | FetchProductsWithSearchPhraseActionTypes
    | FetchProductByProductNumberActionTypes
    | SortOptionsActionTypes;
