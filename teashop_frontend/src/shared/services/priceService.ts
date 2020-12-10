const currencyText = "€";

export const getPriceTextWithCurrency = (price: number) =>
    `${price.toFixed(2)} ${currencyText}`;
