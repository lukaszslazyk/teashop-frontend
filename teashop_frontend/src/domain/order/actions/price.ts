export const SET_SUBTOTAL_PRICE = "SET_SUBTOTAL_PRICE";
export const SET_SHIPPING_FEE = "SET_SHIPPING_FEE";
export const SET_PAYMENT_FEE = "SET_PAYMENT_FEE";

interface SetSubtotalPriceAction {
    type: typeof SET_SUBTOTAL_PRICE;
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
    | SetSubtotalPriceAction
    | SetShippingFeeAction
    | SetPaymentFeeAction;

export const setSubtotalPrice = (value: number): PriceActionTypes => ({
    type: SET_SUBTOTAL_PRICE,
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
