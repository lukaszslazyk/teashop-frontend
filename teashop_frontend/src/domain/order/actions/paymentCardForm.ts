import { PaymentCardFormData } from "../models";

export const SET_PAYMENT_CARD_FORM_DATA = "SET_PAYMENT_CARD_FORM_DATA";

interface SetPaymentCardFormDataAction {
    type: typeof SET_PAYMENT_CARD_FORM_DATA;
    value: PaymentCardFormData;
}

export type PaymentCardFormActionTypes = SetPaymentCardFormDataAction;

export const setPaymentCardFormData = (value: PaymentCardFormData): PaymentCardFormActionTypes => ({
    type: SET_PAYMENT_CARD_FORM_DATA,
    value: value,
});
