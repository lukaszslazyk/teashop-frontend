import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSessionCart } from "../domain/cart/actions";
import { createCancelToken } from "../shared/utils/cancelToken";
import Routing from "./routing";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = createCancelToken();
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
