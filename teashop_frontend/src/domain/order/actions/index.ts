import {
    ContactInfoActionTypes,
    SET_CONTACT_INFO,
    VALIDATE_CONTACT_INFO_FORM,
    SET_CONTACT_INFO_FORM_VALID,
    setContactInfo,
    validateContactInfoForm,
    setContactInfoFormValid,
} from "./contactInfo";
import {
    CreditCardActionTypes,
    SET_CREDIT_CARD,
    VALIDATE_CREDIT_CARD_FORM,
    SET_CREDIT_CARD_FORM_VALID,
    setCreditCard,
    validateCreditCardForm,
    setCreditCardFormValid,
} from "./creditCard";
import {
    PaymentMethodActionTypes,
    SET_CHOSEN_PAYMENT_METHOD,
    setChosenPaymentMethod,
} from "./paymentMethod";
import {
    ShippingAddressActionTypes,
    SET_SHIPPING_ADDRESS,
    VALIDATE_SHIPPING_ADDRESS_FORM,
    SET_SHIPPING_ADDRESS_FORM_VALID,
    setShippingAddress,
    validateShippingAddressForm,
    setShippingAddressFormValid,
} from "./shippingAddress";
import {
    ShippingMethodActionTypes,
    SET_CHOSEN_SHIPPING_METHOD,
    setChosenShippingMethod,
} from "./shippingMethod";

export {
    setContactInfo,
    validateContactInfoForm,
    setContactInfoFormValid,
    setShippingAddress,
    validateShippingAddressForm,
    setShippingAddressFormValid,
    setChosenShippingMethod,
    setChosenPaymentMethod,
    setCreditCard,
    validateCreditCardForm,
    setCreditCardFormValid,
};

export {
    SET_CONTACT_INFO,
    VALIDATE_CONTACT_INFO_FORM,
    SET_CONTACT_INFO_FORM_VALID,
    SET_SHIPPING_ADDRESS,
    VALIDATE_SHIPPING_ADDRESS_FORM,
    SET_SHIPPING_ADDRESS_FORM_VALID,
    SET_CHOSEN_SHIPPING_METHOD,
    SET_CHOSEN_PAYMENT_METHOD,
    SET_CREDIT_CARD,
    VALIDATE_CREDIT_CARD_FORM,
    SET_CREDIT_CARD_FORM_VALID,
};

export type OrderActionTypes =
    | ContactInfoActionTypes
    | ShippingAddressActionTypes
    | ShippingMethodActionTypes
    | PaymentMethodActionTypes
    | CreditCardActionTypes;
