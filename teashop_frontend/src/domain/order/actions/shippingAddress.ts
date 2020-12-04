import { Address } from "../models";

export const SET_SHIPPING_ADDRESS = "SET_SHIPPING_ADDRESS";

interface SetShippingAddressAction {
    type: typeof SET_SHIPPING_ADDRESS;
    value: Address;
}

export type ShippingAddressActionTypes = SetShippingAddressAction;

export const setShippingAddress = (
    value: Address
): ShippingAddressActionTypes => ({
    type: SET_SHIPPING_ADDRESS,
    value: value,
});
