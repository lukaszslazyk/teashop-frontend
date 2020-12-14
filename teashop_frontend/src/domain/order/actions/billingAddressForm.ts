import { AddressFormData } from "../models";

export const SET_BILLING_ADDRESS_FORM_DATA = "SET_BILLING_ADDRESS_FORM_DATA";

interface SetBillingAddressFormDataAction {
    type: typeof SET_BILLING_ADDRESS_FORM_DATA;
    value: AddressFormData;
}

export type BillingAddressFormActionTypes = SetBillingAddressFormDataAction;

export const setBillingAddressFormData = (
    value: AddressFormData
): BillingAddressFormActionTypes => ({
    type: SET_BILLING_ADDRESS_FORM_DATA,
    value: value,
});
