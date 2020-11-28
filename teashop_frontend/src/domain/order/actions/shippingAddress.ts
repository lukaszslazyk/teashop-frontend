import { ShippingAddress } from "../models";

export const SET_SHIPPING_ADDRESS = "SET_SHIPPING_ADDRESS";
export const VALIDATE_SHIPPING_ADDRESS_FORM = "VALIDATE_SHIPPING_ADDRESS_FORM";
export const SET_SHIPPING_ADDRESS_FORM_VALID =
    "SET_SHIPPING_ADDRESS_FORM_VALID";

interface SetShippingAddressAction {
    type: typeof SET_SHIPPING_ADDRESS;
    value: ShippingAddress;
}

interface ValidateShippingAddressFormAction {
    type: typeof VALIDATE_SHIPPING_ADDRESS_FORM;
}

interface SetShippingAddressFormValidAction {
    type: typeof SET_SHIPPING_ADDRESS_FORM_VALID;
    value: boolean;
}

export type ShippingAddressActionTypes =
    | SetShippingAddressAction
    | ValidateShippingAddressFormAction
    | SetShippingAddressFormValidAction;

export const setShippingAddress = (
    value: ShippingAddress
): ShippingAddressActionTypes => ({
    type: SET_SHIPPING_ADDRESS,
    value: value,
});

export const validateShippingAddressForm = (): ShippingAddressActionTypes => ({
    type: VALIDATE_SHIPPING_ADDRESS_FORM,
});

export const setShippingAddressFormValid = (
    value: boolean
): ShippingAddressActionTypes => ({
    type: SET_SHIPPING_ADDRESS_FORM_VALID,
    value: value,
});
