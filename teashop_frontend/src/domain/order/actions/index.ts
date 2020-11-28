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

export {
    setContactInfo,
    validateContactInfoForm,
    setContactInfoFormValid,
    setShippingAddress,
    validateShippingAddressForm,
    setShippingAddressFormValid,
};

export {
    SET_CONTACT_INFO,
    VALIDATE_CONTACT_INFO_FORM,
    SET_CONTACT_INFO_FORM_VALID,
    SET_SHIPPING_ADDRESS,
    VALIDATE_SHIPPING_ADDRESS_FORM,
    SET_SHIPPING_ADDRESS_FORM_VALID,
};

export type OrderActionTypes =
    | ContactInfoActionTypes
    | ShippingAddressActionTypes;
