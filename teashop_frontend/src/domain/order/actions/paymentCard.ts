import { PaymentCard } from "../models";

export const SET_PAYMENT_CARD = "SET_PAYMENT_CARD";

interface SetPaymentCardAction {
    type: typeof SET_PAYMENT_CARD;
    value: PaymentCard;
}

export type PaymentCardActionTypes = SetPaymentCardAction;

export const setPaymentCard = (value: PaymentCard): PaymentCardActionTypes => ({
    type: SET_PAYMENT_CARD,
    value: value,
});
