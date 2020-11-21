import React, { useEffect } from "react";
import Routing from "./routing";
import { useDispatch } from "react-redux";
import { fetchSessionCart } from "../domain/cart/actions";
import { createCancelToken } from "../shared/utils/cancelToken";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        let cancelToken = createCancelToken();
        dispatch(fetchSessionCart(cancelToken));
        return () => cancelToken.cancel();
    }, [dispatch]);

    return (
        <div>
            <Routing />
        </div>
    );
}

export default App;
