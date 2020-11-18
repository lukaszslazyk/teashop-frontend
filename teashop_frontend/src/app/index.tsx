import React, { useEffect } from "react";
import Routing from "./routing";
import { useDispatch } from "react-redux";
import { fetchSessionCart } from "../domain/cart/actions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSessionCart());
    }, [dispatch]);

    return (
        <div>
            <Routing />
        </div>
    );
}

export default App;
