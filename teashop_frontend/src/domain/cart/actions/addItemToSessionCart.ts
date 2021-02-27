import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
import { Product } from "../../product/models";
import { CartItem } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_ADD_ITEM_TO_SESSION_CART =
    "REQUEST_ADD_ITEM_TO_SESSION_CART";
export const RECEIVE_ADD_ITEM_TO_SESSION_CART =
    "RECEIVE_ADD_ITEM_TO_SESSION_CART";

interface RequestAddItemToSessionCartAction {
    type: typeof REQUEST_ADD_ITEM_TO_SESSION_CART;
}

interface ReceiveAddItemToSessionCartAction {
    type: typeof RECEIVE_ADD_ITEM_TO_SESSION_CART;
    addedItem: CartItem | null;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

export type AddItemToSessionCartActionTypes =
    | RequestAddItemToSessionCartAction
    | ReceiveAddItemToSessionCartAction;

export const requestAddItemToSessionCart = (): AddItemToSessionCartActionTypes => ({
    type: REQUEST_ADD_ITEM_TO_SESSION_CART,
});

export const receiveAddItemToSessionCart = (
    addedItem: CartItem | null,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): AddItemToSessionCartActionTypes => ({
    type: RECEIVE_ADD_ITEM_TO_SESSION_CART,
    addedItem: addedItem,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveAddItemToSessionCartError = (
    errorType: ApiErrorType
): AddItemToSessionCartActionTypes => ({
    type: RECEIVE_ADD_ITEM_TO_SESSION_CART,
    addedItem: null,
    errorOccurred: true,
    errorType: errorType,
});

export const addItemToSessionCart = (
    product: Product,
    quantity: number,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestAddItemToSessionCart());
    await axios
        .post(
            `${API_ROOT}/carts/sessionCart/items`,
            {
                productId: product.id,
                quantity: quantity,
            },
            {
                cancelToken: cancelToken.tokenSource.token,
                withCredentials: true,
            }
        )
        .then(response =>
            dispatch(
                receiveAddItemToSessionCart({
                    product: product,
                    quantity: quantity,
                })
            )
        )
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(
                        receiveAddItemToSessionCartError(ApiErrorType.Timeout)
                    );
                else
                    dispatch(
                        receiveAddItemToSessionCartError(
                            ApiErrorType.Unexpected
                        )
                    );
        });
};
