import axios from "axios";
import { toggleDisableInteractionForLoading } from "../../../shared/actions";
import { RequestCancelToken } from "../../../shared/services/requestCancelTokenService";
import { ApiErrorType, AppThunk } from "../../../shared/types";
import { clearCart } from "../../cart/actions";
import { OrderFormData, OrderLine } from "../models";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS =
    "SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS";
export const REQUEST_PLACE_ORDER = "REQUEST_PLACE_ORDER";
export const RECEIVE_PLACE_ORDER = "RECEIVE_PLACE_ORDER";

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
    orderNumber: number | null;
    errorOccurred: boolean;
    errorType: ApiErrorType;
}

export type OrderFormActionTypes =
    | SetShippingAddressSameAsBillingAddressAction
    | RequestPlaceOrderAction
    | ReceivePlaceOrderAction;

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
    orderNumber: number | null,
    errorOccurred: boolean = false,
    errorType: ApiErrorType = ApiErrorType.None
): OrderFormActionTypes => ({
    type: RECEIVE_PLACE_ORDER,
    orderId: orderId,
    orderNumber: orderNumber,
    errorOccurred: errorOccurred,
    errorType: errorType,
});

export const receivePlaceOrderError = (
    errorType: ApiErrorType
): OrderFormActionTypes => ({
    type: RECEIVE_PLACE_ORDER,
    orderId: null,
    orderNumber: null,
    errorOccurred: true,
    errorType: errorType,
});

export const placeOrder = (
    orderFormData: OrderFormData,
    orderLines: OrderLine[],
    cancelToken: RequestCancelToken
): AppThunk<void> => async dispatch => {
    dispatch(toggleDisableInteractionForLoading());
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
                orderLines: mapToRequestOrderLines(orderLines),
            },
            {
                cancelToken: cancelToken.tokenSource.token,
                withCredentials: true,
            }
        )
        .then(response => {
            dispatch(clearCart());
            dispatch(
                receivePlaceOrder(
                    response.data.orderId,
                    response.data.orderNumber
                )
            );
            dispatch(toggleDisableInteractionForLoading());
        })
        .catch(error => {
            if (!axios.isCancel(error))
                if (error.message === "Network Error")
                    dispatch(receivePlaceOrderError(ApiErrorType.Timeout));
                else
                    dispatch(receivePlaceOrderError(ApiErrorType.Unexpected));
            dispatch(toggleDisableInteractionForLoading());
        });
};

const mapToRequestOrderLines = (orderLines: OrderLine[]) =>
    orderLines.map(line => ({
        productId: line.product.id,
        quantity: line.quantity,
    }));
