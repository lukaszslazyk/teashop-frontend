import axios from "axios";
import { AppThunk } from "../../../shared/types";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY =
    "REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY";
export const RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY =
    "RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY";

interface RequestUpdateSessionCartItemQuantityAction {
    type: typeof REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY;
}

interface ReceiveUpdateSessionCartItemQuantityAction {
    type: typeof RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY;
    errorOccurred: boolean;
    errorMessage: string;
}

export type UpdateSessionCartItemQuantityActionTypes =
    | RequestUpdateSessionCartItemQuantityAction
    | ReceiveUpdateSessionCartItemQuantityAction;

export const requestUpdateSessionCartItemQuantity = (): UpdateSessionCartItemQuantityActionTypes => ({
    type: REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY,
});

export const receiveUpdateSessionCartItemQuantity = (
    errorOccurred: boolean = false,
    errorMessage: string = ""
): UpdateSessionCartItemQuantityActionTypes => ({
    type: RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    errorOccurred: errorOccurred,
    errorMessage: errorMessage,
});

export const updateSessionCartItemQuantity = (
    productId: string,
    quantity: number
): AppThunk<void> => {
    return async (dispatch) => {
        dispatch(requestUpdateSessionCartItemQuantity());
        await axios
            .patch(
                `${API_ROOT}/carts/sessionCart/items/${productId}`,
                { quantity: quantity },
                { withCredentials: true }
            )
            .then((response) =>
                dispatch(receiveUpdateSessionCartItemQuantity())
            )
            .catch((error) => {
                dispatch(receiveUpdateSessionCartItemQuantity(true));
            });
    };
};
