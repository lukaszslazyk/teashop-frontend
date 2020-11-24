import { Product } from "../models";

export const pricedByWeight = (product: Product) =>
    product.quantityPerPrice > 1;
