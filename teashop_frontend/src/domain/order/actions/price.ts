export const SET_CART_PRICE = "SET_CART_PRICE";
export const SET_SHIPPING_PRICE = "SET_SHIPPING_PRICE";

interface SetCartPriceAction {
    type: typeof SET_CART_PRICE;
    value: number;
}

interface SetShippingPriceAction {
    type: typeof SET_SHIPPING_PRICE;
    value: number;
}

export type PriceActionTypes = SetCartPriceAction | SetShippingPriceAction;

export const setCartPrice = (value: number): PriceActionTypes => ({
    type: SET_CART_PRICE,
    value: value,
});

export const setShippingPrice = (value: number): PriceActionTypes => ({
    type: SET_SHIPPING_PRICE,
    value: value,
});
