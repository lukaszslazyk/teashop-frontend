import { CreditCard } from "../models";

export const SET_CREDIT_CARD = "SET_CREDIT_CARD";

interface SetCreditCardAction {
    type: typeof SET_CREDIT_CARD;
    value: CreditCard;
}

export type CreditCardActionTypes = SetCreditCardAction;

export const setCreditCard = (value: CreditCard): CreditCardActionTypes => ({
    type: SET_CREDIT_CARD,
    value: value,
});
