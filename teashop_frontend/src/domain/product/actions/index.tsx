import {
    FetchAllProductsActionTypes,
    REQUEST_ALL_PRODUCTS,
    RECEIVE_ALL_PRODUCTS,
    fetchAllProducts,
} from "./fetchAllProducts";
import {
    FetchProductsInCategoryActionTypes,
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    fetchProductsInCategory,
} from "./fetchProductsInCategory";
import {
    FetchProductByIdActionTypes,
    REQUEST_PRODUCT_BY_ID,
    RECEIVE_PRODUCT_BY_ID,
    fetchProductById,
} from "./fetchProductById";

export { fetchAllProducts, fetchProductsInCategory, fetchProductById };

export {
    REQUEST_ALL_PRODUCTS,
    RECEIVE_ALL_PRODUCTS,
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCT_BY_ID,
    RECEIVE_PRODUCT_BY_ID,
};

export type ProductActionTypes =
    | FetchAllProductsActionTypes
    | FetchProductsInCategoryActionTypes
    | FetchProductByIdActionTypes;
