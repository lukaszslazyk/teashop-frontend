import {
    FetchSessionCartActionTypes,
    RECEIVE_SESSION_CART,
    REQUEST_SESSION_CART,
    fetchSessionCart,
} from "./fetchSessionCart";
import {
    AddItemToSessionCartActionTypes,
    RECEIVE_ADD_ITEM_TO_SESSION_CART,
    REQUEST_ADD_ITEM_TO_SESSION_CART,
    addItemToSessionCart,
} from "./addItemToSessionCart";
import {
    RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY,
    UpdateSessionCartItemQuantityActionTypes,
    updateSessionCartItemQuantity,
} from "./updateSessionCartItemQuantity";
import {
    RECEIVE_REMOVE_ITEM_FROM_SESSION_CART,
    REQUEST_REMOVE_ITEM_FROM_SESSION_CART,
    RemoveItemFromSessionCartActionTypes,
    removeItemFromSessionCart,
} from "./removeItemFromSessionCart";

export {
    fetchSessionCart,
    addItemToSessionCart,
    updateSessionCartItemQuantity,
    removeItemFromSessionCart,
};

export {
    REQUEST_SESSION_CART,
    RECEIVE_SESSION_CART,
    REQUEST_ADD_ITEM_TO_SESSION_CART,
    RECEIVE_ADD_ITEM_TO_SESSION_CART,
    REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY,
    RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    REQUEST_REMOVE_ITEM_FROM_SESSION_CART,
    RECEIVE_REMOVE_ITEM_FROM_SESSION_CART,
};

export type CartActionTypes =
    | FetchSessionCartActionTypes
    | AddItemToSessionCartActionTypes
    | UpdateSessionCartItemQuantityActionTypes
    | RemoveItemFromSessionCartActionTypes;
