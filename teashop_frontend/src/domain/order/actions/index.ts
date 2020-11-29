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
};

export {
    SET_CONTACT_INFO,
    VALIDATE_CONTACT_INFO_FORM,
    SET_CONTACT_INFO_FORM_VALID,
    SET_SHIPPING_ADDRESS,
    VALIDATE_SHIPPING_ADDRESS_FORM,
    SET_SHIPPING_ADDRESS_FORM_VALID,
    SET_CHOSEN_SHIPPING_METHOD,
};

export type OrderActionTypes =
    | ContactInfoActionTypes
    | ShippingAddressActionTypes
    | ShippingMethodActionTypes;
