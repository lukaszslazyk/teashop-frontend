import { combineReducers } from "redux";
import { cartReducer } from "../../domain/cart/reducers";
import { orderReducer } from "../../domain/order/reducers";
import { productReducer } from "../../domain/product/reducers";

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
