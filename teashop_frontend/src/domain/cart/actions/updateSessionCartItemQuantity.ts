import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";

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
    errorType: ApiErrorType;
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
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): UpdateSessionCartItemQuantityActionTypes => ({
    type: RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    productId: productId,
    quantity: quantity,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveUpdateSessionCartItemQuantityError = (
    productId: string,
    quantity: number,
    errorType: ApiErrorType
): UpdateSessionCartItemQuantityActionTypes => ({
    type: RECEIVE_UPDATE_SESSION_CART_ITEM_QUANTITY,
    productId: productId,
    quantity: quantity,
    errorOccurred: true,
    errorType: errorType,
});

export const updateSessionCartItemQuantity = (
    productId: string,
    quantity: number,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestUpdateSessionCartItemQuantity());
    await axios
        .patch(
            `${API_ROOT}/carts/sessionCart/items/${productId}`,
            {
                quantity: quantity,
            },
            {
                cancelToken: cancelToken.tokenSource.token,
                withCredentials: true,
            }
        )
        .then(response =>
            dispatch(receiveUpdateSessionCartItemQuantity(productId, quantity))
        )
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(
                        receiveUpdateSessionCartItemQuantityError(
                            productId,
                            quantity,
                            ApiErrorType.Unavailable
                        )
                    );
                else
                    dispatch(
                        receiveUpdateSessionCartItemQuantityError(
                            productId,
                            quantity,
                            ApiErrorType.Unexpected
                        )
                    );
        });
};
