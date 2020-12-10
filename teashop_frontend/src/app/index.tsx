import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSessionCart } from "../domain/cart/actions";
import { createRequestCancelToken } from "../shared/services/requestCancelTokenService";
import AppRouter from "./components/AppRouter";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchSessionCart(cancelToken));
        return () => cancelToken.cancel();
    }, [dispatch]);

    return (
        <div>
            <AppRouter />
        </div>
    );
};

export default App;
