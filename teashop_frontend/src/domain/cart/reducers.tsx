import {
    CartActionTypes,
    RECEIVE_SESSION_CART,
    RECEIVE_ADD_ITEM_TO_SESSION_CART,
    RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    RECEIVE_REMOVE_ITEM_FROM_SESSION_CART,
    REQUEST_ADD_ITEM_TO_SESSION_CART,
    REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY,
    REQUEST_REMOVE_ITEM_FROM_SESSION_CART,
    REQUEST_SESSION_CART,
} from "./actions";
import { Cart, CartItem } from "./models";

export interface CartState {
    cart: Cart;
    isFetching: boolean;
    isSending: boolean;
    errorOccurred: boolean;
    errorMessage: string;
}

const initialState: CartState = {
    cart: { items: [] },
    isFetching: false,
    isSending: false,
    errorOccurred: false,
    errorMessage: "",
};

export function cartReducer(
    state = initialState,
    action: CartActionTypes
): CartState {
    switch (action.type) {
        case REQUEST_SESSION_CART:
            return {
                ...state,
                isFetching: true,
                errorOccurred: false,
            };
        case REQUEST_ADD_ITEM_TO_SESSION_CART:
        case REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY:
        case REQUEST_REMOVE_ITEM_FROM_SESSION_CART:
            return {
                ...state,
                isSending: true,
                errorOccurred: false,
            };
        case RECEIVE_SESSION_CART:
            return {
                ...state,
                isFetching: false,
                cart: action.cart ? action.cart : initialState.cart,
                errorOccurred: action.errorOccurred,
            };
        case RECEIVE_ADD_ITEM_TO_SESSION_CART:
            if (action.addedItem)
                addItemToStateCart(state, action.addedItem);
            return {
                ...state,
                isSending: false,
                errorOccurred: action.errorOccurred,
            };
        case RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY:
        case RECEIVE_REMOVE_ITEM_FROM_SESSION_CART:
            return {
                ...state,
                isSending: false,
                errorOccurred: action.errorOccurred,
            };
        default:
            return state;
    }
}

function addItemToStateCart(state: CartState, item: CartItem) {
    let found = state.cart.items.find((i) => i.product.id === item.product.id);
    if (found === undefined)
        state.cart.items = [...state.cart.items, item];
    else
        found.quantity += item.quantity;
}
