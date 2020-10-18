export interface Product {
    id: number;
    name: string;
    pricePerReference: number;
    currency: string;
    referenceValue: number;
    unit: string;
}

export interface ProductState {
    products: Product[];
}

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

interface GetAllProductsAction {
    type: typeof GET_ALL_PRODUCTS;
}

export type ProductActionTypes = GetAllProductsAction;
