import { Product } from "../product/models";

export interface Cart {
    items: CartItem[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}
