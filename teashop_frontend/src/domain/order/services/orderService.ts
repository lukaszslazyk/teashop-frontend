import { Cart } from "../../cart/models";
import { OrderLine } from "../models";

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

export const mapToOrderLines = (cart: Cart): OrderLine[] =>
    cart.items.map(item => ({
        productId: item.product.id,
        product: item.product,
        quantity: item.quantity,
    }));

export const calculateOrderSubtotalPrice = (orderLines: OrderLine[]) =>
    orderLines
        .map(calculateOrderLinePrice)
        .reduce((x, y) => x + y, 0);

export const calculateOrderLinePrice = (orderLine: OrderLine) => {
    if (!orderLine.product)
        return 0;
    return (
        (orderLine.product.price * orderLine.quantity) /
        orderLine.product.quantityPerPrice
    );
};
