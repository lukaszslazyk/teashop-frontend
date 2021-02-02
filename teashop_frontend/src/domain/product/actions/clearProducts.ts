export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";

interface ClearProductsAction {
    type: typeof CLEAR_PRODUCTS;
}

export type ClearProductsActionTypes = ClearProductsAction;

export const clearProducts = (): ClearProductsActionTypes => ({
    type: CLEAR_PRODUCTS,
});
