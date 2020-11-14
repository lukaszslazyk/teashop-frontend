import axios from "axios";
import { AppThunk } from "../../common/types";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_REMOVE_ITEM_FROM_SESSION_CART =
    "REQUEST_REMOVE_ITEM_FROM_SESSION_CART";
export const RECEIVE_REMOVE_ITEM_FROM_SESSION_CART =
    "RECEIVE_REMOVE_ITEM_FROM_SESSION_CART";

interface RequestRemoveItemFromSessionCartAction {
    type: typeof REQUEST_REMOVE_ITEM_FROM_SESSION_CART;
}

interface ReceiveRemoveItemFromSessionCartAction {
    type: typeof RECEIVE_REMOVE_ITEM_FROM_SESSION_CART;
    errorOccurred: boolean;
}

export type RemoveItemFromSessionCartActionTypes =
    | RequestRemoveItemFromSessionCartAction
    | ReceiveRemoveItemFromSessionCartAction;

export const requestRemoveItemFromSessionCart = (): RemoveItemFromSessionCartActionTypes => ({
    type: REQUEST_REMOVE_ITEM_FROM_SESSION_CART,
});

export const receiveRemoveItemFromSessionCart = (
    errorOccurred: boolean = false
): RemoveItemFromSessionCartActionTypes => ({
    type: RECEIVE_REMOVE_ITEM_FROM_SESSION_CART,
    errorOccurred: errorOccurred,
});

export const removeItemFromSessionCart = (
    productId: string
): AppThunk<void> => {
    return async (dispatch) => {
        dispatch(requestRemoveItemFromSessionCart());
        await axios
            .delete(`${API_ROOT}/carts/sessionCart/items/${productId}`)
            .then((response) => dispatch(receiveRemoveItemFromSessionCart()))
            .catch((error) => {
                dispatch(receiveRemoveItemFromSessionCart(true));
            });
    };
};
