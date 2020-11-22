import { Product } from "../../product/models";
import { Cart, CartItem } from "../models";

export function calculateCartPrice(cart: Cart) {
    return cart.items
        .map(calculateItemPrice)
        .reduce((x, y) => x + y, 0);
}

export function calculateItemPrice(cartItem: CartItem) {
    return calculateItemPriceWith(cartItem.product, cartItem.quantity);
}

export function calculateItemPriceWith(product: Product, quantity: number) {
    return product.price * quantity / product.quantityPerPrice;
}
