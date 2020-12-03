import { ShippingAddress } from "../models";

export const SET_SHIPPING_ADDRESS = "SET_SHIPPING_ADDRESS";

interface SetShippingAddressAction {
    type: typeof SET_SHIPPING_ADDRESS;
    value: ShippingAddress;
}

export type ShippingAddressActionTypes = SetShippingAddressAction;

export const setShippingAddress = (
    value: ShippingAddress
): ShippingAddressActionTypes => ({
    type: SET_SHIPPING_ADDRESS,
    value: value,
});
