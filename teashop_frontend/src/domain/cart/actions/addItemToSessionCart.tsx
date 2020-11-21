import axios from "axios";
import { AppThunk } from "../../../shared/types";
import { CancelToken } from "../../../shared/utils/cancelToken";
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
}

export type AddItemToSessionCartActionTypes =
    | RequestAddItemToSessionCartAction
    | ReceiveAddItemToSessionCartAction;

export const requestAddItemToSessionCart = (): AddItemToSessionCartActionTypes => ({
    type: REQUEST_ADD_ITEM_TO_SESSION_CART,
});

export const receiveAddItemToSessionCart = (
    addedItem: CartItem | null,
    errorOccurred: boolean = false
): AddItemToSessionCartActionTypes => ({
    type: RECEIVE_ADD_ITEM_TO_SESSION_CART,
    addedItem: addedItem,
    errorOccurred: errorOccurred,
});

export const addItemToSessionCart = (
    product: Product,
    quantity: number,
    cancelToken: CancelToken
): AppThunk<void> => {
    return async (dispatch) => {
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
            .then((response) =>
                dispatch(
                    receiveAddItemToSessionCart({
                        product: product,
                        quantity: quantity,
                    })
                )
            )
            .catch((error) => {
                if (!axios.isCancel(error))
                    dispatch(receiveAddItemToSessionCart(null, true));
            });
    };
};
