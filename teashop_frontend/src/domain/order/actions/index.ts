import {
    ContactInfoFormActionTypes,
    SET_CONTACT_INFO_FORM_DATA,
    setContactInfoFormData,
} from "./contactInfo";
import {
    OrderFormActionTypes,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    placeOrder,
} from "./orderForm";
import {
    OrderMetaActionTypes,
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    fetchOrderMeta,
} from "./orderMeta";
import {
    PaymentCardFormActionTypes,
    SET_PAYMENT_CARD_FORM_DATA,
    setPaymentCardFormData,
} from "./paymentCardForm";
import {
    PaymentMethodFormActionTypes,
    SET_CHOSEN_PAYMENT_METHOD,
    setChosenPaymentMethod,
} from "./paymentMethodForm";
import {
    PriceActionTypes,
    SET_CART_PRICE,
    SET_SHIPPING_PRICE,
    setCartPrice,
    setShippingPrice,
} from "./price";
import {
    ShippingAddressFormActionTypes,
    SET_SHIPPING_ADDRESS_FORM_DATA,
    setShippingAddressFormData,
} from "./shippingAddressForm";
import {
    ShippingMethodFormActionTypes,
    SET_CHOSEN_SHIPPING_METHOD,
    setChosenShippingMethod,
} from "./shippingMethodForm";

export {
    fetchOrderMeta,
    placeOrder,
    setContactInfoFormData,
    setShippingAddressFormData,
    setChosenShippingMethod,
    setChosenPaymentMethod,
    setPaymentCardFormData,
    setCartPrice,
    setShippingPrice,
};

export {
    REQUEST_ORDER_META,
    RECEIVE_ORDER_META,
    REQUEST_PLACE_ORDER,
    RECEIVE_PLACE_ORDER,
    SET_CONTACT_INFO_FORM_DATA,
    SET_SHIPPING_ADDRESS_FORM_DATA,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_PAYMENT_CARD_FORM_DATA,
    SET_CART_PRICE,
    SET_SHIPPING_PRICE,
};

export type OrderActionTypes =
    | OrderMetaActionTypes
    | OrderFormActionTypes
    | ContactInfoFormActionTypes
    | ShippingMethodFormActionTypes
    | ShippingAddressFormActionTypes
    | PaymentMethodFormActionTypes
    | PaymentCardFormActionTypes
    | PriceActionTypes;
