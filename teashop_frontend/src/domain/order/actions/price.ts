export const SET_CART_PRICE = "SET_CART_PRICE";
export const SET_SHIPPING_FEE = "SET_SHIPPING_FEE";
export const SET_PAYMENT_FEE = "SET_PAYMENT_FEE";

interface SetCartPriceAction {
    type: typeof SET_CART_PRICE;
    value: number;
}

interface SetShippingFeeAction {
    type: typeof SET_SHIPPING_FEE;
    value: number;
}

interface SetPaymentFeeAction {
    type: typeof SET_PAYMENT_FEE;
    value: number;
}

export type PriceActionTypes =
    | SetCartPriceAction
    | SetShippingFeeAction
    | SetPaymentFeeAction;

export const setCartPrice = (value: number): PriceActionTypes => ({
    type: SET_CART_PRICE,
    value: value,
});

export const setShippingFee = (value: number): PriceActionTypes => ({
    type: SET_SHIPPING_FEE,
    value: value,
});

export const setPaymentFee = (value: number): PriceActionTypes => ({
    type: SET_PAYMENT_FEE,
    value: value,
});
