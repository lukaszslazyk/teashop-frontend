import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { AppThunk } from "../../../shared/types";
import { Order } from "../models";
import axios from "axios";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const REQUEST_PLACE_ORDER = "REQUEST_PLACE_ORDER";
export const RECEIVE_PLACE_ORDER = "RECEIVE_PLACE_ORDER";

interface RequestPlaceOrderAction {
    type: typeof REQUEST_PLACE_ORDER;
}

interface ReceivePlaceOrderAction {
    type: typeof RECEIVE_PLACE_ORDER;
    orderId: string | null;
    errorOccurred: boolean;
}

export type MainOrderActionTypes =
    | RequestPlaceOrderAction
    | ReceivePlaceOrderAction;

export const requestPlaceOrder = (): MainOrderActionTypes => ({
    type: REQUEST_PLACE_ORDER,
});

export const receivePlaceOrder = (
    orderId: string | null,
    errorOccurred: boolean = false
): MainOrderActionTypes => ({
    type: RECEIVE_PLACE_ORDER,
    orderId: orderId,
    errorOccurred: errorOccurred,
});

export const placeOrder = (
    order: Order,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestPlaceOrder());
    await axios
        .post(
            `${API_ROOT}/order`,
            {
                contactInfo: order.contactInfo,
                shippingAddress: order.shippingAddress,
                chosenShippingMethodName: order.chosenShippingMethod?.name,
                chosenPaymentMethodName: order.chosenPaymentMethod?.name,
                paymentCard: order.paymentCard,
            },
            {
                cancelToken: cancelToken.tokenSource.token,
                withCredentials: true,
            }
        )
        .then(response => dispatch(receivePlaceOrder(response.data)))
        .catch(error => {
            if (!axios.isCancel(error))
                dispatch(receivePlaceOrder(null, true));
        });
};
