import { AddressFormData } from "../models";

export const SET_SHIPPING_ADDRESS_FORM_DATA = "SET_SHIPPING_ADDRESS_FORM_DATA";

interface SetShippingAddressFormDataAction {
    type: typeof SET_SHIPPING_ADDRESS_FORM_DATA;
    value: AddressFormData;
}

export type ShippingAddressFormActionTypes = SetShippingAddressFormDataAction;

export const setShippingAddressFormData = (
    value: AddressFormData
): ShippingAddressFormActionTypes => ({
    type: SET_SHIPPING_ADDRESS_FORM_DATA,
    value: value,
});
