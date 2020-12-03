import {
    OrderActionTypes,
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    SET_CONTACT_INFO,
    SET_SHIPPING_ADDRESS,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_CREDIT_CARD,
} from "./actions";
import {
    ContactInfo,
    Country,
    CreditCard,
    PaymentMethod,
    ShippingAddress,
    ShippingMethod,
} from "./models";

export interface OrderState {
    orderMetaIsFetching: boolean;
    orderMetaErrorOccurred: boolean;
    countries: Country[];
    shippingMethods: ShippingMethod[];
    paymentMethods: PaymentMethod[];
    chosenShippingMethod: ShippingMethod | null;
    chosenPaymentMethod: PaymentMethod | null;
    contactInfo: ContactInfo;
    shippingAddress: ShippingAddress;
    creditCard: CreditCard;
}

const initialState: OrderState = {
    orderMetaIsFetching: false,
    orderMetaErrorOccurred: false,
    countries: [],
    shippingMethods: [],
    paymentMethods: [],
    chosenShippingMethod: null,
    chosenPaymentMethod: null,
    contactInfo: {
        email: "",
    },
    shippingAddress: {
        firstName: "",
        lastName: "",
        company: "",
        address1: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
    },
    creditCard: {
        number: "",
        nameOnCard: "",
        expirationDate: "",
        securityCode: "",
    },
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
                countries: action.orderMeta
                    ? action.orderMeta.countries
                    : initialState.countries,
                shippingMethods: action.orderMeta
                    ? action.orderMeta.shippingMethods
                    : initialState.shippingMethods,
                paymentMethods: action.orderMeta
                    ? action.orderMeta.paymentMethods
                    : initialState.paymentMethods,
            };
        case SET_CONTACT_INFO:
            return {
                ...state,
                contactInfo: action.value,
            };
        case SET_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.value,
            };
        case SET_CREDIT_CARD:
            return {
                ...state,
                creditCard: action.value,
            };
        case SET_CHOSEN_SHIPPING_METHOD:
            return {
                ...state,
                chosenShippingMethod: findShippingMethodWithName(
                    action.shippingMethodName,
                    state
                ),
            };
        case SET_CHOSEN_PAYMENT_METHOD:
            return {
                ...state,
                chosenPaymentMethod: findPaymentMethodWithName(
                    action.paymentMethodName,
                    state
                ),
            };
        default:
            return state;
    }
};

const findShippingMethodWithName = (
    name: string,
    state: OrderState
): ShippingMethod | null => {
    const found = state.shippingMethods.find(method => method.name === name);
    return found ? found : null;
};

const findPaymentMethodWithName = (
    name: string,
    state: OrderState
): PaymentMethod | null => {
    const found = state.paymentMethods.find(method => method.name === name);
    return found ? found : null;
};
