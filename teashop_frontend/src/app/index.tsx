import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSessionCart } from "../domain/cart/actions";
import { createRequestCancelToken } from "../shared/services/requestCancelTokenService";
import Routing from "./routing";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchSessionCart(cancelToken));
        return () => cancelToken.cancel();
    }, [dispatch]);

    return (
        <div>
            <Routing />
        </div>
    );
};

export default App;
