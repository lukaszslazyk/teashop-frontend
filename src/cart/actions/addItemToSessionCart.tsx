import axios from "axios";
import { AppThunk } from "../../common/types";

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
    errorMessage: string;
}

export type AddItemToSessionCartActionTypes =
    | RequestAddItemToSessionCartAction
    | ReceiveAddItemToSessionCartAction;

export const requestAddItemToSessionCart = (): AddItemToSessionCartActionTypes => ({
    type: REQUEST_ADD_ITEM_TO_SESSION_CART,
});

export const receiveAddItemToSessionCart = (
    errorMessage: string = ""
): AddItemToSessionCartActionTypes => ({
    type: RECEIVE_ADD_ITEM_TO_SESSION_CART,
    errorMessage: errorMessage,
});

export const addItemToSessionCart = (
    productId: string,
    quantity: number
): AppThunk<void> => {
    return async (dispatch) => {
        dispatch(requestAddItemToSessionCart());
        await axios
            .post(`${API_ROOT}/carts/sessionCart/items`, {
                productId: productId,
                quantity: quantity,
            })
            .then((response) => dispatch(receiveAddItemToSessionCart()))
            .catch((error) => {
                dispatch(
                    receiveAddItemToSessionCart(
                        "Error occurred while adding item to your cart. "
                        + "Please try again later."
                    )
                );
            });
    };
};
