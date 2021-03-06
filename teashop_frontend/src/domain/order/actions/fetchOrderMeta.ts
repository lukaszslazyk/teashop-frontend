import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
import { OrderMeta } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_ORDER_META = "REQUEST_ORDER_META";
export const RECEIVE_ORDER_META = "RECEIVE_ORDER_META";

interface RequestOrderMetaAction {
    type: typeof REQUEST_ORDER_META;
}

interface ReceiveOrderMetaAction {
    type: typeof RECEIVE_ORDER_META;
    orderMeta: OrderMeta | null;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

export type OrderMetaActionTypes =
    | RequestOrderMetaAction
    | ReceiveOrderMetaAction;

export const requestOrderMeta = (): OrderMetaActionTypes => ({
    type: REQUEST_ORDER_META,
});

export const receiveOrderMeta = (
    orderMeta: OrderMeta | null,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): OrderMetaActionTypes => ({
    type: RECEIVE_ORDER_META,
    orderMeta: orderMeta,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receiveOrderMetaError = (
    errorType: ApiErrorType
): OrderMetaActionTypes => ({
    type: RECEIVE_ORDER_META,
    orderMeta: null,
    errorOccurred: true,
    errorType: errorType,
});

export const fetchOrderMeta = (
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestOrderMeta());
    await axios
        .get(`${API_ROOT}/orders/meta`, {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response => {
            if (valid(response.data))
                dispatch(receiveOrderMeta(response.data));
            else
                dispatch(receiveOrderMetaError(ApiErrorType.InvalidResponse));
        })
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(
                        receiveOrderMetaError(ApiErrorType.Timeout)
                    );
                else
                    dispatch(receiveOrderMetaError(ApiErrorType.Unexpected));
        });
};

const valid = (orderMeta: OrderMeta) =>
    !countriesEmpty(orderMeta) &&
    !shippingMethodsEmpty(orderMeta) &&
    !paymentMethodsEmpty(orderMeta);

const countriesEmpty = (orderMeta: OrderMeta) =>
    orderMeta.countries.length === 0;

const shippingMethodsEmpty = (orderMeta: OrderMeta) =>
    orderMeta.shippingMethods.length === 0;

const paymentMethodsEmpty = (orderMeta: OrderMeta) =>
    orderMeta.paymentMethods.length === 0;
