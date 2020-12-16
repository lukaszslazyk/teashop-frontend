import axios from "axios";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
import { clearCart } from "../../cart/actions";
import { OrderFormData } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS =
    "SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS";
export const REQUEST_PLACE_ORDER = "REQUEST_PLACE_ORDER";
export const RECEIVE_PLACE_ORDER = "RECEIVE_PLACE_ORDER";
export const RESET_ORDER_PLACED = "RESET_ORDER_PLACED";

interface SetShippingAddressSameAsBillingAddressAction {
    type: typeof SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS;
    value: boolean;
}

interface RequestPlaceOrderAction {
    type: typeof REQUEST_PLACE_ORDER;
}

interface ReceivePlaceOrderAction {
    type: typeof RECEIVE_PLACE_ORDER;
    orderId: string | null;
    orderNo: number | null;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

interface ResetOrderPlacedAction {
    type: typeof RESET_ORDER_PLACED;
}

export type OrderFormActionTypes =
    | SetShippingAddressSameAsBillingAddressAction
    | RequestPlaceOrderAction
    | ReceivePlaceOrderAction
    | ResetOrderPlacedAction;

export const setShippingAddressSameAsBillingAddress = (
    value: boolean
): OrderFormActionTypes => ({
    type: SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS,
    value: value,
});

export const requestPlaceOrder = (): OrderFormActionTypes => ({
    type: REQUEST_PLACE_ORDER,
});

export const receivePlaceOrder = (
    orderId: string | null,
    orderNo: number | null,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): OrderFormActionTypes => ({
    type: RECEIVE_PLACE_ORDER,
    orderId: orderId,
    orderNo: orderNo,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receivePlaceOrderError = (
    errorType: ApiErrorType
): OrderFormActionTypes => ({
    type: RECEIVE_PLACE_ORDER,
    orderId: null,
    orderNo: null,
    errorOccurred: true,
    errorType: errorType,
});

export const resetOrderPlaced = (): OrderFormActionTypes => ({
    type: RESET_ORDER_PLACED,
});

export const placeOrder = (
    orderFormData: OrderFormData,
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(requestPlaceOrder());
    await axios
        .post(
            `${API_ROOT}/order`,
            {
                contactInfo: orderFormData.contactInfoFormData,
                shippingAddress: orderFormData.shippingAddressFormData,
                billingAddress: orderFormData.billingAddressSameAsShippingAddress
                    ? orderFormData.shippingAddressFormData
                    : orderFormData.billingAddressFormData,
                chosenShippingMethodName:
                    orderFormData.chosenShippingMethodName,
                chosenPaymentMethodName: orderFormData.chosenPaymentMethodName,
                paymentCard: orderFormData.paymentCardFormData,
            },
            {
                cancelToken: cancelToken.tokenSource.token,
                withCredentials: true,
            }
        )
        .then(response => {
            dispatch(clearCart());
            dispatch(
                receivePlaceOrder(response.data.orderId, response.data.orderNo)
            );
        })
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(receivePlaceOrderError(ApiErrorType.Timeout));
                else dispatch(receivePlaceOrderError(ApiErrorType.Unexpected));
        });
};
