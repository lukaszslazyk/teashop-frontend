import {
    CartActionTypes,
    RECEIVE_SESSION_CART,
    RECEIVE_ADD_ITEM_TO_SESSION_CART,
    RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    RECEIVE_REMOVE_ITEM_FROM_SESSION_CART,
} from "./actions";
import { Cart } from "./models";

export interface CartState {
    cart: Cart | null;
    errorOccurred: boolean;
    errorMessage: string;
}

const initialStete: CartState = {
    cart: null,
    errorOccurred: false,
    errorMessage: "",
};

export function cartReducer(
    state = initialStete,
    action: CartActionTypes
): CartState {
    switch (action.type) {
        case RECEIVE_SESSION_CART:
            return {
                ...state,
                cart: action.cart,
                errorOccurred: action.errorOccurred,
            };
        case RECEIVE_ADD_ITEM_TO_SESSION_CART:
        case RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY:
        case RECEIVE_REMOVE_ITEM_FROM_SESSION_CART:
            return {
                ...state,
                errorOccurred: action.errorOccurred,
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
}
