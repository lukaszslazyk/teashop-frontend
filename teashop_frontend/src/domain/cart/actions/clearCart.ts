export const CLEAR_CART = "CLEAR_CART";

export interface ClearCartAction {
    type: typeof CLEAR_CART;
}

export const clearCart = (): ClearCartAction => ({
    type: CLEAR_CART,
});
