export const SET_CHOSEN_SHIPPING_METHOD = "SET_CHOSEN_SHIPPING_METHOD";

interface SetChosenShippingMethodAction {
    type: typeof SET_CHOSEN_SHIPPING_METHOD;
    shippingMethodName: string;
}

export type ShippingMethodFormActionTypes = SetChosenShippingMethodAction;

export const setChosenShippingMethod = (
    shippingMethodName: string
): ShippingMethodFormActionTypes => ({
    type: SET_CHOSEN_SHIPPING_METHOD,
    shippingMethodName: shippingMethodName,
});
