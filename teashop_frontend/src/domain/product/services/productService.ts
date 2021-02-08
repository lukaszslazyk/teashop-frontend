import { knownCategoryNamesToDisplayNames, Product } from "../models";

export const pricedByWeight = (product: Product) =>
    product.quantityPerPrice > 1;

export const getDisplayNameFor = (categoryName: string): string => {
    const displayName = knownCategoryNamesToDisplayNames[categoryName];
    return displayName !== undefined ? displayName : "Browse";
};
