import {
    ProductActionTypes,
    RECEIVE_PRODUCTS_IN_CATEGORY,
    RECEIVE_PRODUCT_BY_ID,
    REQUEST_PRODUCTS_IN_CATEGORY,
    REQUEST_PRODUCT_BY_ID,
} from "./actions";
import { Product } from "./models";

export interface ProductState {
    products: Product[];
    product: Product | null;
    isFetching: boolean;
    errorOccurred: boolean;
}

const initialState: ProductState = {
    products: [],
    product: null,
    isFetching: false,
    errorOccurred: false,
};

export function productReducer(
    action: ProductActionTypes,
    state = initialState
): ProductState {
    switch (action.type) {
        case REQUEST_PRODUCTS_IN_CATEGORY:
        case REQUEST_PRODUCT_BY_ID:
            return {
                ...state,
                isFetching: true,
                errorOccurred: false,
            };
        case RECEIVE_PRODUCTS_IN_CATEGORY:
            return {
                ...state,
                isFetching: false,
                products: action.products,
                errorOccurred: action.errorOccurred,
            };
        case RECEIVE_PRODUCT_BY_ID:
            return {
                ...state,
                isFetching: false,
                product: action.product,
                errorOccurred: action.errorOccurred,
            };
        default:
            return state;
    }
}
