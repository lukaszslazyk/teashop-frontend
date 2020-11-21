import axios from "axios";
import { AppThunk } from "../../../shared/types";
import { CancelToken } from "../../../shared/utils/cancelToken";
import { Cart } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_SESSION_CART = "REQUEST_SESSION_CART";
export const RECEIVE_SESSION_CART = "RECEIVE_SESSION_CART";

interface RequestSessionCartAction {
    type: typeof REQUEST_SESSION_CART;
}

interface ReceiveSessionCartAction {
    type: typeof RECEIVE_SESSION_CART;
    cart: Cart | null;
    errorOccurred: boolean;
}

export type FetchSessionCartActionTypes =
    | RequestSessionCartAction
    | ReceiveSessionCartAction;

export const requestSessionCart = (): FetchSessionCartActionTypes => ({
    type: REQUEST_SESSION_CART,
});

export const receiveSessionCart = (
    cart: Cart | null,
    errorOccurred: boolean = false
): FetchSessionCartActionTypes => ({
    type: RECEIVE_SESSION_CART,
    cart: cart,
    errorOccurred: errorOccurred,
});

export const fetchSessionCart = (
    cancelToken: CancelToken
): AppThunk<void> => {
    return async (dispatch) => {
        dispatch(requestSessionCart());
        await axios
            .get(`${API_ROOT}/carts/sessionCart`, {
                cancelToken: cancelToken.tokenSource.token,
                withCredentials: true,
            })
            .then((response) => dispatch(receiveSessionCart(response.data)))
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.error("Error occurred during fetching session cart");
                    dispatch(receiveSessionCart(null, true));
                }
            });
    };
};
