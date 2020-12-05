export const SET_CHOSEN_PAYMENT_METHOD = "SET_CHOSEN_PAYMENT_METHOD";

interface SetChosenPaymentMethodAction {
    type: typeof SET_CHOSEN_PAYMENT_METHOD;
    paymentMethodName: string;
}

export type PaymentMethodFormActionTypes = SetChosenPaymentMethodAction;

export const setChosenPaymentMethod = (
    paymentMethodName: string
): PaymentMethodFormActionTypes => ({
    type: SET_CHOSEN_PAYMENT_METHOD,
    paymentMethodName: paymentMethodName,
});
