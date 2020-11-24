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

export const cartReducer = (
    state = initialState,
    action: CartActionTypes
): CartState => {
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
            if (!action.errorOccurred && action.addedItem)
                addItemToCart(state, action.addedItem);

            return {
                ...state,
                isSending: false,
                errorOccurred: action.errorOccurred,
            };
        case RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY:
            if (!action.errorOccurred)
                updateItemQuantity(state, action.productId, action.quantity);

            return {
                ...state,
                isSending: false,
                errorOccurred: action.errorOccurred,
            };
        case RECEIVE_REMOVE_ITEM_FROM_SESSION_CART:
            if (!action.errorOccurred)
                removeItemFromCart(state, action.removedItemProductId);

            return {
                ...state,
                isSending: false,
                errorOccurred: action.errorOccurred,
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
