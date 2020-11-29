export const SET_CHOSEN_PAYMENT_METHOD = "SET_CHOSEN_PAYMENT_METHOD";

interface SetChosenPaymentMethodAction {
    type: typeof SET_CHOSEN_PAYMENT_METHOD;
    paymentMethodName: string;
}

export type PaymentMethodActionTypes = SetChosenPaymentMethodAction;

export const setChosenPaymentMethod = (
    paymentMethodName: string
): PaymentMethodActionTypes => ({
    type: SET_CHOSEN_PAYMENT_METHOD,
    paymentMethodName: paymentMethodName,
});
