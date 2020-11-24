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

export { fetchProductsInCategory, fetchProductById };

export {
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCT_BY_ID,
    RECEIVE_PRODUCT_BY_ID,
};

export type ProductActionTypes =
    | FetchProductsInCategoryActionTypes
    | FetchProductByIdActionTypes;
