import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { AppThunk } from "../../../shared/types";
import { receiveProductById } from "../../product/actions/fetchProductById";
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
}

export type OrderMetaActionTypes =
    | RequestOrderMetaAction
    | ReceiveOrderMetaAction;

export const requestOrderMeta = (): OrderMetaActionTypes => ({
    type: REQUEST_ORDER_META,
});

export const receiveOrderMeta = (
    orderMeta: OrderMeta | null,
    errorOccurred: boolean = false
): OrderMetaActionTypes => ({
    type: RECEIVE_ORDER_META,
    orderMeta: orderMeta,
    errorOccurred: errorOccurred,
});

export const fetchOrderMeta = (
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestOrderMeta());
    await axios
        .get(`${API_ROOT}/order/meta`, {
            cancelToken: cancelToken.tokenSource.token,
        })
        .then(response => {
            if (valid(response.data))
                dispatch(receiveOrderMeta(response.data));
            else
                dispatch(receiveOrderMeta(null, true));
        })
        .catch(error => {
            if (!axios.isCancel(error))
                dispatch(receiveProductById(null, true));
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
