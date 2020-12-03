import { Cart } from "../../cart/models";
import { calculateCartPrice } from "../../cart/services/cartService";
import { ShippingMethod } from "../models";

const acceptedCreditCardIssuers = [
    "Visa",
    "MasterCard",
    "American Express",
];

const creditCardNumberRegexes = [
    /^(?:4[0-9]{12}(?:[0-9]{3})?)$/, // Visa
    /^(?:5[1-5][0-9]{14})$/, // MasterCard
    /^(?:3[47][0-9]{13})$/, // American Express
];

export const getAcceptedCreditCardIssuers = (): string[] =>
    acceptedCreditCardIssuers;

export const validateCreditCardNumber = (input: string): string | undefined => {
    const anyMatch = creditCardNumberRegexes.some(regex => input.match(regex));
    return anyMatch ? undefined : "Number is invalid";
};

export const calculateTotalOrderPrice = (
    cart: Cart,
    chosenShippingMethod: ShippingMethod | null
) =>
    calculateCartPrice(cart) +
    (chosenShippingMethod ? chosenShippingMethod.price : 0);
