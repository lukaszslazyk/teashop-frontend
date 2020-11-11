import {
    ProductActionTypes,
    RECEIVE_ALL_PRODUCTS,
    REQUEST_ALL_PRODUCTS,
    REQUEST_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCTS_IN_CATEGORY,
} from "./actions";
import {
    RECEIVE_PRODUCT_BY_ID,
    REQUEST_PRODUCT_BY_ID,
} from "./actions/fetchProductById";
import { Product } from "./models";

export interface ProductState {
    products: Product[];
    product: Product | null;
    isFetching: boolean;
    error: boolean;
}

const initialState: ProductState = {
    products: [],
    product: null,
    isFetching: false,
    error: false,
};

export function productReducer(
    state = initialState,
    action: ProductActionTypes
): ProductState {
    switch (action.type) {
        case REQUEST_ALL_PRODUCTS:
        case REQUEST_PRODUCTS_IN_CATEGORY:
        case REQUEST_PRODUCT_BY_ID:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_ALL_PRODUCTS:
        case RECEIVE_PRODUCTS_IN_CATEGORY:
            return {
                ...state,
                isFetching: false,
                products: action.products,
                error: action.error,
            };
        case RECEIVE_PRODUCT_BY_ID:
            return {
                ...state,
                isFetching: false,
                product: action.product,
                error: action.error,
            }
        default:
            return state;
    }
}
