const acceptedPaymentCardIssuers = ["Visa", "MasterCard", "American Express"];

const paymentCardNumberPatterns = [
    /^(?:4[0-9]{12}(?:[0-9]{3})?)$/, // Visa
    /^(?:5[1-5][0-9]{14})$/, // MasterCard
    /^(?:3[47][0-9]{13})$/, // American Express
];

export const getAcceptedPaymentCardIssuers = (): string[] =>
    acceptedPaymentCardIssuers;

export const validatePaymentCardNumber = (
    input: string
): string | undefined => {
    const anyMatch = paymentCardNumberPatterns.some(pattern =>
        input.match(pattern)
    );
    return anyMatch ? undefined : "Number is incorrect";
};
