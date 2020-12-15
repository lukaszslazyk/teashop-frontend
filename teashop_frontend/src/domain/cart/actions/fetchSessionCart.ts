import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
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
    errorType: ApiErrorType;
}

export type FetchSessionCartActionTypes =
    | RequestSessionCartAction
    | ReceiveSessionCartAction;

export const requestSessionCart = (): FetchSessionCartActionTypes => ({
    type: REQUEST_SESSION_CART,
});

export const receiveSessionCart = (
    cart: Cart | null,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): FetchSessionCartActionTypes => ({
    type: RECEIVE_SESSION_CART,
    cart: cart,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveSessionCartError = (
    errorType: ApiErrorType
): FetchSessionCartActionTypes => ({
    type: RECEIVE_SESSION_CART,
    cart: null,
    errorOccurred: true,
    errorType: errorType,
});

export const fetchSessionCart = (
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestSessionCart());
    await axios
        .get(`${API_ROOT}/carts/sessionCart`, {
            cancelToken: cancelToken.tokenSource.token,
            withCredentials: true,
        })
        .then(response => dispatch(receiveSessionCart(response.data)))
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(receiveSessionCartError(ApiErrorType.Unavailable));
                else
                    dispatch(receiveSessionCartError(ApiErrorType.Unexpected));
        });
};
