import {
    ContactInfoActionTypes,
    SET_CONTACT_INFO,
    setContactInfo,
} from "./contactInfo";
import {
    OrderMetaActionTypes,
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    fetchOrderMeta,
} from "./orderMeta";
import {
    PaymentCardActionTypes,
    SET_PAYMENT_CARD,
    setPaymentCard,
} from "./paymentCard";
import {
    PaymentMethodActionTypes,
    SET_CHOSEN_PAYMENT_METHOD,
    setChosenPaymentMethod,
} from "./paymentMethod";
import {
    ShippingAddressActionTypes,
    SET_SHIPPING_ADDRESS,
    setShippingAddress,
} from "./shippingAddress";
import {
    ShippingMethodActionTypes,
    SET_CHOSEN_SHIPPING_METHOD,
    setChosenShippingMethod,
} from "./shippingMethod";
import {
    MainOrderActionTypes,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    placeOrder,
} from "./order";

export {
    fetchOrderMeta,
    placeOrder,
    setContactInfo,
    setShippingAddress,
    setChosenShippingMethod,
    setChosenPaymentMethod,
    setPaymentCard,
};

export {
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    SET_CONTACT_INFO,
    SET_SHIPPING_ADDRESS,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_PAYMENT_CARD,
};

export type OrderActionTypes =
    | MainOrderActionTypes
    | OrderMetaActionTypes
    | ContactInfoActionTypes
    | ShippingAddressActionTypes
    | ShippingMethodActionTypes
    | PaymentMethodActionTypes
    | PaymentCardActionTypes;
