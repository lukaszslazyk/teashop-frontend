import { Cart } from "../../cart/models";
import { calculateCartPrice } from "../../cart/services/cartService";
import { ShippingMethod } from "../models";

export const calculateTotalOrderPrice = (
    cart: Cart,
    chosenShippingMethod: ShippingMethod | null
) =>
    calculateCartPrice(cart) +
    (chosenShippingMethod ? chosenShippingMethod.price : 0);
