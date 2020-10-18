import { Product } from "./models";
import { GET_ALL_PRODUCTS, ProductActionTypes } from "./actions"

export interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

export function productReducer(
    state = initialState,
    action: ProductActionTypes
): ProductState {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                //for testing purposes
                ...state,
                products: [
                    {id: 1, name: "Bancha", pricePerReference: 19.99, currency: 'zl', referenceValue: 100, unit: 'g'},
                    {id: 2, name: "Sencha", pricePerReference: 59.99, currency: 'zl', referenceValue: 100, unit: 'g'},
                    {id: 3, name: "Gyokuro", pricePerReference: 99.99, currency: 'zl', referenceValue: 100, unit: 'g'},      
                    {id: 4, name: "Shincha", pricePerReference: 159.99, currency: 'zl', referenceValue: 100, unit: 'g'},
                ]
            };
        default:
            return state;
    }
}
