import { Product } from "../../product/models";
import { Cart, CartItem } from "../models";

export const calculateCartPrice = (cart: Cart) =>
    cart.items
        .map(calculateItemPrice)
        .reduce((x, y) => x + y, 0);

export const calculateItemPrice = (cartItem: CartItem) =>
    calculateItemPriceWith(cartItem.product, cartItem.quantity);

export const calculateItemPriceWith = (product: Product, quantity: number) =>
    product.price * quantity / product.quantityPerPrice;
