import { StringLiteral } from "typescript";
import {
    OrderActionTypes,
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    SET_CONTACT_INFO,
    SET_SHIPPING_ADDRESS,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_PAYMENT_CARD,
} from "./actions";
import { PaymentMethod, ShippingMethod, OrderMeta, Order } from "./models";

export interface OrderState {
    orderMetaIsFetching: boolean;
    orderMetaErrorOccurred: boolean;
    orderMeta: OrderMeta;
    createdOrder: Order;
    createdOrderIsSending: boolean;
    createdOrderErrorOccurred: boolean;
    placedOrderId: string;
}

const initialOrder: Order = {
    id: "",
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
        country: "",
        phone: "",
    },
    chosenShippingMethod: null,
    chosenPaymentMethod: null,
    paymentCard: null,
    cart: null,
};

const initialState: OrderState = {
    orderMetaIsFetching: false,
    orderMetaErrorOccurred: false,
    orderMeta: {
        countries: [],
        shippingMethods: [],
        paymentMethods: [],
    },
    createdOrder: initialOrder,
    createdOrderIsSending: false,
    createdOrderErrorOccurred: false,
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
            };
        case REQUEST_PLACE_ORDER:
            return {
                ...state,
                createdOrderIsSending: true,
                createdOrderErrorOccurred: false,
            };
        case RECEIVE_PLACE_ORDER:
            return {
                ...state,
                createdOrderIsSending: false,
                createdOrderErrorOccurred: action.errorOccurred,
                placedOrderId: action.orderId ? action.orderId : state.createdOrder.id,
            };
        case SET_CONTACT_INFO:
            return {
                ...state,
                createdOrder: {
                    ...state.createdOrder,
                    contactInfo: action.value,
                },
            };
        case SET_SHIPPING_ADDRESS:
            return {
                ...state,
                createdOrder: {
                    ...state.createdOrder,
                    shippingAddress: action.value,
                },
            };
        case SET_PAYMENT_CARD:
            return {
                ...state,
                createdOrder: {
                    ...state.createdOrder,
                    paymentCard: action.value,
                },
            };
        case SET_CHOSEN_SHIPPING_METHOD:
            return {
                ...state,
                createdOrder: {
                    ...state.createdOrder,
                    chosenShippingMethod: findShippingMethodWithName(
                        action.shippingMethodName,
                        state
                    ),
                },
            };
        case SET_CHOSEN_PAYMENT_METHOD:
            return {
                ...state,
                createdOrder: {
                    ...state.createdOrder,
                    chosenPaymentMethod: findPaymentMethodWithName(
                        action.paymentMethodName,
                        state
                    ),
                },
            };
        default:
            return state;
    }
};

const findShippingMethodWithName = (
    name: string,
    state: OrderState
): ShippingMethod | null => {
    const found = state.orderMeta.shippingMethods.find(
        method => method.name === name
    );
    return found ? found : null;
};

const findPaymentMethodWithName = (
    name: string,
    state: OrderState
): PaymentMethod | null => {
    const found = state.orderMeta.paymentMethods.find(
        method => method.name === name
    );
    return found ? found : null;
};
