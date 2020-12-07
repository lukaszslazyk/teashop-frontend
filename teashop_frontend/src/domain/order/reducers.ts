import {
    OrderActionTypes,
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    SET_CONTACT_INFO_FORM_DATA,
    SET_SHIPPING_ADDRESS_FORM_DATA,
    SET_PAYMENT_CARD_FORM_DATA,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_CART_PRICE,
    SET_SHIPPING_PRICE,
} from "./actions";
import { OrderMeta, OrderFormData } from "./models";

export interface OrderState {
    orderMetaIsFetching: boolean;
    orderMetaErrorOccurred: boolean;
    orderMeta: OrderMeta;
    orderFormData: OrderFormData;
    orderFormIsSending: boolean;
    orderFormErrorOccurred: boolean;
    totalPrice: number;
    cartPrice: number;
    shippingPrice: number;
    orderPlaced: boolean;
    placedOrderId: string;
}

const initialOrderFormData: OrderFormData = {
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
    chosenShippingMethodName: "",
    chosenPaymentMethodName: "",
    paymentCardFormData: {
        number: "",
        name: "",
        expirationDate: "",
        securityCode: "",
    },
};

const initialState: OrderState = {
    orderMetaIsFetching: false,
    orderMetaErrorOccurred: false,
    orderMeta: {
        countries: [],
        shippingMethods: [],
        paymentMethods: [],
    },
    orderFormData: initialOrderFormData,
    orderFormIsSending: false,
    orderFormErrorOccurred: false,
    totalPrice: 0,
    cartPrice: 0,
    shippingPrice: 0,
    orderPlaced: false,
    placedOrderId: "",
};

export const orderReducer = (
    state = initialState,
    action: OrderActionTypes
): OrderState => {
    switch (action.type) {
        case REQUEST_ORDER_META:
            return {
                ...state,
                orderMetaIsFetching: true,
                orderMetaErrorOccurred: false,
            };
        case RECEIVE_ORDER_META:
            return {
                ...state,
                orderMetaIsFetching: false,
                orderMetaErrorOccurred: action.errorOccurred,
                orderMeta: action.orderMeta
                    ? action.orderMeta
                    : initialState.orderMeta,
                orderFormData: {
                    ...state.orderFormData,
                    chosenShippingMethodName: action.orderMeta
                        ? action.orderMeta.shippingMethods[0].name
                        : "",
                    chosenPaymentMethodName: action.orderMeta
                        ? action.orderMeta.paymentMethods[0].name
                        : "",
                    shippingAddressFormData: {
                        ...state.orderFormData.shippingAddressFormData,
                        countryCode: action.orderMeta
                            ? action.orderMeta.countries[0].code
                            : "",
                    },
                },
            };
        case REQUEST_PLACE_ORDER:
            return {
                ...state,
                orderFormIsSending: true,
                orderFormErrorOccurred: false,
            };
        case RECEIVE_PLACE_ORDER:
            let newState = {
                ...state,
                orderFormIsSending: false,
                orderFormErrorOccurred: action.errorOccurred,
                orderPlaced: !action.errorOccurred,
                placedOrderId: action.orderId ? action.orderId : "",
            };
            if (!action.errorOccurred)
                newState = {
                    ...newState,
                    orderFormData: initialOrderFormData,
                    totalPrice: 0,
                    cartPrice: 0,
                    shippingPrice: 0,
                };
            return newState;
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
                totalPrice: action.value + state.shippingPrice,
            };
        case SET_SHIPPING_PRICE:
            return {
                ...state,
                shippingPrice: action.value,
                totalPrice: state.cartPrice + action.value,
            };
        default:
            return state;
    }
};