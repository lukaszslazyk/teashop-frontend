import {
    ContactInfoActionTypes,
    SET_CONTACT_INFO,
    setContactInfo,
} from "./contactInfo";
import {
    CreditCardActionTypes,
    SET_CREDIT_CARD,
    setCreditCard,
} from "./creditCard";
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

export {
    setContactInfo,
    setShippingAddress,
    setChosenShippingMethod,
    setChosenPaymentMethod,
    setCreditCard,
};

export {
    SET_CONTACT_INFO,
    SET_SHIPPING_ADDRESS,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_CREDIT_CARD,
};

export type OrderActionTypes =
    | ContactInfoActionTypes
    | ShippingAddressActionTypes
    | ShippingMethodActionTypes
    | PaymentMethodActionTypes
    | CreditCardActionTypes;
