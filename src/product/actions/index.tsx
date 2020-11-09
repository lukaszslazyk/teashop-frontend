import {
    FetchAllProductsActionTypes,
    REQUEST_ALL_PRODUCTS,
    RECEIVE_ALL_PRODUCTS,
    fetchAllProducts
} from "./fetchAllProducts";
import {
    FetchProductsInCategoryActionTypes,
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    fetchProductsInCategory
} from "./fetchProductsInCategory";

export {
    fetchAllProducts,
    fetchProductsInCategory
}

export {
    REQUEST_ALL_PRODUCTS,
    RECEIVE_ALL_PRODUCTS,
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
};

export type ProductActionTypes =
    | FetchAllProductsActionTypes
    | FetchProductsInCategoryActionTypes;
