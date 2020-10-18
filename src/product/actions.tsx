export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

interface GetAllProductsAction {
  type: typeof GET_ALL_PRODUCTS;
}

export type ProductActionTypes = GetAllProductsAction;

export const getAllProducts = (): ProductActionTypes => ({
  type: GET_ALL_PRODUCTS,
});
