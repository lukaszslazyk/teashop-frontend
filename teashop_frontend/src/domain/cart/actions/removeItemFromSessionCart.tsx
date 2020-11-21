import axios from "axios";
import { AppThunk } from "../../../shared/types";
import { CancelToken } from "../../../shared/utils/cancelToken";

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
    removedItemProductId: string;
    errorOccurred: boolean;
}

export type RemoveItemFromSessionCartActionTypes =
    | RequestRemoveItemFromSessionCartAction
    | ReceiveRemoveItemFromSessionCartAction;

export const requestRemoveItemFromSessionCart = (): RemoveItemFromSessionCartActionTypes => ({
    type: REQUEST_REMOVE_ITEM_FROM_SESSION_CART,
});

export const receiveRemoveItemFromSessionCart = (
    removedItemProductId: string,
    errorOccurred: boolean = false
): RemoveItemFromSessionCartActionTypes => ({
    type: RECEIVE_REMOVE_ITEM_FROM_SESSION_CART,
    removedItemProductId: removedItemProductId,
    errorOccurred: errorOccurred,
});

export const removeItemFromSessionCart = (
    productId: string,
    cancelToken: CancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestRemoveItemFromSessionCart());
    await axios
        .delete(`${API_ROOT}/carts/sessionCart/items/${productId}`, {
            cancelToken: cancelToken.tokenSource.token,
            withCredentials: true,
        })
        .then(response => dispatch(receiveRemoveItemFromSessionCart(productId)))
        .catch(error => {
            if (!axios.isCancel(error))
                dispatch(receiveRemoveItemFromSessionCart(productId, true));
        });
};
