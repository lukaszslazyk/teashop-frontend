import { combineReducers } from "redux";
import { cartReducer } from "../cart/reducers";
import { productReducer } from "../product/reducers";

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
