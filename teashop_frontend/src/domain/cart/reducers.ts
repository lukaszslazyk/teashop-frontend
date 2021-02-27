import { ApiErrorType } from "../../shared/types";
import {
    CartActionTypes,
    RECEIVE_ADD_ITEM_TO_SESSION_CART,
    RECEIVE_REMOVE_ITEM_FROM_SESSION_CART,
    RECEIVE_SESSION_CART,
    RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    REQUEST_ADD_ITEM_TO_SESSION_CART,
    REQUEST_REMOVE_ITEM_FROM_SESSION_CART,
    REQUEST_SESSION_CART,
    REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY,
    CLEAR_CART,
} from "./actions";
import { Cart, CartItem } from "./models";

export interface CartState {
    cart: Cart;
    cartIsFetching: boolean;
    cartUpdateIsSending: boolean;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

const initialState: CartState = {
    cart: { items: [] },
    cartIsFetching: false,
    cartUpdateIsSending: false,
    errorOccurred: false,
    errorType: ApiErrorType.None,
};

export const cartReducer = (
    state = initialState,
    action: CartActionTypes
): CartState => {
    switch (action.type) {
        case REQUEST_SESSION_CART:
            return {
                ...state,
                cartIsFetching: true,
                errorOccurred: false,
                errorType: ApiErrorType.None,
            };
        case RECEIVE_SESSION_CART:
            return {
                ...state,
                cartIsFetching: false,
                cart: action.cart ? action.cart : initialState.cart,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
        case REQUEST_ADD_ITEM_TO_SESSION_CART:
        case REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY:
        case REQUEST_REMOVE_ITEM_FROM_SESSION_CART:
            return {
                ...state,
                cartUpdateIsSending: true,
                errorOccurred: false,
                errorType: ApiErrorType.None,
            };
        case RECEIVE_ADD_ITEM_TO_SESSION_CART:
            if (!action.errorOccurred && action.addedItem)
                addItemToCart(state, action.addedItem);

            return {
                ...state,
                cartUpdateIsSending: false,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
        case RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY:
            if (!action.errorOccurred)
                updateItemQuantity(state, action.productId, action.quantity);

            return {
                ...state,
                cartUpdateIsSending: false,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
        case RECEIVE_REMOVE_ITEM_FROM_SESSION_CART:
            if (!action.errorOccurred)
                removeItemFromCart(state, action.removedItemProductId);

            return {
                ...state,
                cartUpdateIsSending: false,
                errorOccurred: action.errorOccurred,
                errorType: action.errorType,
            };
        case CLEAR_CART:
            return {
                ...state,
                cart: { items: [] },
            };
        default:
            return state;
    }
};

const addItemToCart = (state: CartState, item: CartItem) => {
    const found = state.cart.items.find(i => i.product.id === item.product.id);
    if (found)
        found.quantity += item.quantity;
    else
        state.cart.items = [...state.cart.items, item];
};

const updateItemQuantity = (
    state: CartState,
    productId: string,
    quantity: number
) => {
    const found = state.cart.items.find(i => i.product.id === productId);
    if (found)
        found.quantity = quantity;
};

const removeItemFromCart = (state: CartState, productId: string) => {
    state.cart.items = state.cart.items.filter(i => i.product.id !== productId);
};
