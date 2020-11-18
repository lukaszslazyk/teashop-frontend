import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";

function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    );
}

export default configureStore;
