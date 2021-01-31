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
    CLEAR_PRODUCTS,
    fetchProductsInCategory,
    clearProducts,
} from "./fetchProductsInCategory";

export { fetchProductsInCategory, fetchProductById, clearProducts };

export {
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCT_BY_ID,
    RECEIVE_PRODUCT_BY_ID,
    CLEAR_PRODUCTS,
};

export type ProductActionTypes =
    | FetchProductsInCategoryActionTypes
    | FetchProductByIdActionTypes;
