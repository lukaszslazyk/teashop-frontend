export const SET_CHOSEN_SHIPPING_METHOD = "SET_CHOSEN_SHIPPING_METHOD";

interface SetChosenShippingMethodAction {
    type: typeof SET_CHOSEN_SHIPPING_METHOD;
    shippingMethodName: string;
}

export type ShippingMethodActionTypes = SetChosenShippingMethodAction;

export const setChosenShippingMethod = (
    shippingMethodName: string
): ShippingMethodActionTypes => ({
    type: SET_CHOSEN_SHIPPING_METHOD,
    shippingMethodName: shippingMethodName,
});
