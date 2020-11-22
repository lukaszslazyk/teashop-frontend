import { Product } from "../models";

export function pricedByWeight(product: Product) {
    return product.quantityPerPrice > 1;
}
