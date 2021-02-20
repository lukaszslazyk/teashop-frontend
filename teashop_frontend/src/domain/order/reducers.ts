import { ApiErrorType } from "../../shared/types";
import {
    OrderActionTypes,
    REQUEST_ORDER,
    RECEIVE_ORDER,
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    SET_CONTACT_INFO_FORM_DATA,
    SET_SHIPPING_ADDRESS_FORM_DATA,
    SET_BILLING_ADDRESS_FORM_DATA,
    SET_PAYMENT_CARD_FORM_DATA,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_CART_PRICE,
    SET_SHIPPING_FEE,
    SET_PAYMENT_FEE,
    SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS,
    INCREMENT_CHECKOUT_STEP,
    DECREMENT_CHECKOUT_STEP,
    CLOSE_CHECKOUT,
} from "./actions";
import { OrderMeta, OrderFormData, Order } from "./models";

export interface OrderState {
    order: Order;
    orderIsFetching: boolean;
    orderErrorOccurred: boolean;
    orderErrorType: ApiErrorType;
    orderMeta: OrderMeta;
    orderMetaFetchedSuccessfully: boolean;
    orderMetaIsFetching: boolean;
    orderMetaErrorOccurred: boolean;
    orderMetaErrorType: ApiErrorType;
    orderFormData: OrderFormData;
    orderFormIsSending: boolean;
    orderFormErrorOccurred: boolean;
    orderFormErrorType: ApiErrorType;
    totalPrice: number;
    cartPrice: number;
    shippingFee: number;
    paymentFee: number;
    orderPlaced: boolean;
    placedOrderId: string;
    placedOrderNumber: number;
    checkoutStep: number;
}

const initialState: OrderState = {
    order: {
        orderNumber: 0,
        placementDate: new Date(),
        contactInfo: {
            email: "",
        },
        shippingAddress: {
            firstName: "",
            lastName: "",
            company: "",
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
            city: "",
            country: {
                code: "",
                name: "",
            },
            phone: "",
        },
        billingAddress: {
            firstName: "",
            lastName: "",
            company: "",
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
            city: "",
            country: {
                code: "",
                name: "",
            },
            phone: "",
        },
        chosenShippingMethod: {
            name: "",
            displayName: "",
            fee: 0,
        },
        chosenPaymentMethod: {
            name: "",
            displayName: "",
            fee: 0,
        },
        cart: {
            items: [],
        },
        totalPrice: 0,
        shippingFee: 0,
        paymentFee: 0,
    },
    orderIsFetching: false,
    orderErrorOccurred: false,
    orderErrorType: ApiErrorType.None,
    orderMetaFetchedSuccessfully: false,
    orderMetaIsFetching: false,
    orderMetaErrorOccurred: false,
    orderMetaErrorType: ApiErrorType.None,
    orderMeta: {
        countries: [],
        shippingMethods: [],
        paymentMethods: [],
    },
    orderFormData: {
        contactInfoFormData: {
            email: "",
        },
        shippingAddressFormData: {
            firstName: "",
            lastName: "",
            company: "",
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
            city: "",
            countryCode: "",
            phone: "",
        },
        billingAddressFormData: {
            firstName: "",
            lastName: "",
            company: "",
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
            city: "",
            countryCode: "",
            phone: "",
        },
        billingAddressSameAsShippingAddress: true,
        chosenShippingMethodName: "",
        chosenPaymentMethodName: "",
        paymentCardFormData: {
            number: "",
            name: "",
            expirationDate: "",
            securityCode: "",
        },
    },
    orderFormIsSending: false,
    orderFormErrorOccurred: false,
    orderFormErrorType: ApiErrorType.None,
    totalPrice: 0,
    cartPrice: 0,
    shippingFee: 0,
    paymentFee: 0,
    orderPlaced: false,
    placedOrderId: "",
    placedOrderNumber: 0,
    checkoutStep: 0,
};

export const orderReducer = (
    state = initialState,
    action: OrderActionTypes
): OrderState => {
    switch (action.type) {
        case REQUEST_ORDER:
            return {
                ...state,
                orderIsFetching: true,
                orderErrorOccurred: false,
                orderErrorType: ApiErrorType.None,
            };
        case RECEIVE_ORDER: {
            return {
                ...state,
                orderIsFetching: false,
                orderErrorOccurred: action.errorOccurred,
                order: action.order
                    ? {
                        ...action.order,
                        placementDate: new Date(action.order.placementDate),
                    }
                    : initialState.order,
                orderErrorType: action.errorType,
            };
        }
        case REQUEST_ORDER_META:
            return {
                ...state,
                orderMetaIsFetching: true,
                orderMetaErrorOccurred: false,
                orderMetaErrorType: ApiErrorType.None,
            };
        case RECEIVE_ORDER_META:
            let receiveOrderMetaState = {
                ...state,
                orderMetaFetchedSuccessfully: !action.errorOccurred,
                orderMetaIsFetching: false,
                orderMetaErrorOccurred: action.errorOccurred,
                orderMetaErrorType: action.errorType,
                orderMeta: action.orderMeta
                    ? action.orderMeta
                    : initialState.orderMeta,
            };
            if (!action.errorOccurred)
                receiveOrderMetaState = setInitialOrderFormDataValues(
                    receiveOrderMetaState
                );
            return receiveOrderMetaState;
        case SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS:
            return {
                ...state,
                orderFormData: {
                    ...state.orderFormData,
                    billingAddressSameAsShippingAddress: action.value,
                },
            };
        case REQUEST_PLACE_ORDER:
            return {
                ...state,
                orderFormIsSending: true,
                orderFormErrorOccurred: false,
                orderFormErrorType: ApiErrorType.None,
            };
        case RECEIVE_PLACE_ORDER:
            let receivePlaceOrderState = {
                ...state,
                orderFormIsSending: false,
                orderFormErrorOccurred: action.errorOccurred,
                orderFormErrorType: action.errorType,
                orderPlaced: !action.errorOccurred,
                placedOrderId: action.orderId
                    ? action.orderId
                    : initialState.placedOrderId,
                placedOrderNumber: action.orderNumber
                    ? action.orderNumber
                    : initialState.placedOrderNumber,
            };
            if (!action.errorOccurred) {
                receivePlaceOrderState = {
                    ...receivePlaceOrderState,
                    orderFormData: initialState.orderFormData,
                    totalPrice: 0,
                    cartPrice: 0,
                    shippingFee: 0,
                    paymentFee: 0,
                };
                receivePlaceOrderState = setInitialOrderFormDataValues(
                    receivePlaceOrderState
                );
            }
            return receivePlaceOrderState;
        case SET_CONTACT_INFO_FORM_DATA:
            return {
                ...state,
                orderFormData: {
                    ...state.orderFormData,
                    contactInfoFormData: action.value,
                },
            };
        case SET_SHIPPING_ADDRESS_FORM_DATA:
            return {
                ...state,
                orderFormData: {
                    ...state.orderFormData,
                    shippingAddressFormData: action.value,
                },
            };
        case SET_BILLING_ADDRESS_FORM_DATA:
            return {
                ...state,
                orderFormData: {
                    ...state.orderFormData,
                    billingAddressFormData: action.value,
                },
            };
        case SET_PAYMENT_CARD_FORM_DATA:
            return {
                ...state,
                orderFormData: {
                    ...state.orderFormData,
                    paymentCardFormData: action.value,
                },
            };
        case SET_CHOSEN_SHIPPING_METHOD:
            return {
                ...state,
                orderFormData: {
                    ...state.orderFormData,
                    chosenShippingMethodName: action.shippingMethodName,
                },
            };
        case SET_CHOSEN_PAYMENT_METHOD:
            return {
                ...state,
                orderFormData: {
                    ...state.orderFormData,
                    chosenPaymentMethodName: action.paymentMethodName,
                },
            };
        case SET_CART_PRICE:
            return {
                ...state,
                cartPrice: action.value,
                totalPrice: action.value + state.shippingFee + state.paymentFee,
            };
        case SET_SHIPPING_FEE:
            return {
                ...state,
                shippingFee: action.value,
                totalPrice: state.cartPrice + state.paymentFee + action.value,
            };
        case SET_PAYMENT_FEE:
            return {
                ...state,
                paymentFee: action.value,
                totalPrice: state.cartPrice + state.shippingFee + action.value,
            };
        case INCREMENT_CHECKOUT_STEP:
            return {
                ...state,
                checkoutStep: state.checkoutStep + 1,
            };
        case DECREMENT_CHECKOUT_STEP:
            return {
                ...state,
                checkoutStep: state.checkoutStep - 1,
            };
        case CLOSE_CHECKOUT:
            return {
                ...state,
                orderPlaced: false,
                checkoutStep: 0,
            };
        default:
            return state;
    }
};

const setInitialOrderFormDataValues = (state: OrderState): OrderState => ({
    ...state,
    orderFormData: {
        ...state.orderFormData,
        chosenShippingMethodName: state.orderMeta.shippingMethods[0].name,
        chosenPaymentMethodName: state.orderMeta.paymentMethods[0].name,
        shippingAddressFormData: {
            ...state.orderFormData.shippingAddressFormData,
            countryCode: state.orderMeta.countries[0].code,
        },
        billingAddressFormData: {
            ...state.orderFormData.billingAddressFormData,
            countryCode: state.orderMeta.countries[0].code,
        },
    },
});
