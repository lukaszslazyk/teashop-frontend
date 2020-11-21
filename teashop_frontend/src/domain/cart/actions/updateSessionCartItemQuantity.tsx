import axios, { CancelTokenSource } from "axios";
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
    productId: string;
    quantity: number;
    errorOccurred: boolean;
}

export type UpdateSessionCartItemQuantityActionTypes =
    | RequestUpdateSessionCartItemQuantityAction
    | ReceiveUpdateSessionCartItemQuantityAction;

export const requestUpdateSessionCartItemQuantity = (): UpdateSessionCartItemQuantityActionTypes => ({
    type: REQUEST_UPDATE_SESSION_CART_ITEM_QUANTITY,
});

export const receiveUpdateSessionCartItemQuantity = (
    productId: string,
    quantity: number,
    errorOccurred: boolean = false
): UpdateSessionCartItemQuantityActionTypes => ({
    type: RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    productId: productId,
    quantity: quantity,
    errorOccurred: errorOccurred,
});

export const updateSessionCartItemQuantity = (
    productId: string,
    quantity: number,
    cancelToken: CancelTokenSource
): AppThunk<void> => {
    return async (dispatch) => {
        dispatch(requestUpdateSessionCartItemQuantity());
        await axios
            .patch(
                `${API_ROOT}/carts/sessionCart/items/${productId}`,
                { quantity: quantity },
                {
                    cancelToken: cancelToken.token,
                    withCredentials: true,
                }
            )
            .then((response) =>
                dispatch(
                    receiveUpdateSessionCartItemQuantity(productId, quantity)
                )
            )
            .catch((error) => {
                if (!axios.isCancel(error))
                    dispatch(
                        receiveUpdateSessionCartItemQuantity(productId, quantity, true)
                    );
            });
    };
};
