import { CreditCard } from "../models";

export const SET_CREDIT_CARD = "SET_CREDIT_CARD";
export const VALIDATE_CREDIT_CARD_FORM = "VALIDATE_CREDIT_CARD_FORM";
export const SET_CREDIT_CARD_FORM_VALID = "SET_CREDIT_CARD_FORM_VALID";

interface SetCreditCardAction {
    type: typeof SET_CREDIT_CARD;
    value: CreditCard;
}

interface ValidateCreditCardFormAction {
    type: typeof VALIDATE_CREDIT_CARD_FORM;
}

interface SetCreditCardFormValid {
    type: typeof SET_CREDIT_CARD_FORM_VALID;
    value: boolean;
}

export type CreditCardActionTypes =
    | SetCreditCardAction
    | ValidateCreditCardFormAction
    | SetCreditCardFormValid;

export const setCreditCard = (value: CreditCard): CreditCardActionTypes => ({
    type: SET_CREDIT_CARD,
    value: value,
});

export const validateCreditCardForm = (): CreditCardActionTypes => ({
    type: VALIDATE_CREDIT_CARD_FORM,
});

export const setCreditCardFormValid = (
    value: boolean
): CreditCardActionTypes => ({
    type: SET_CREDIT_CARD_FORM_VALID,
    value: value,
});
