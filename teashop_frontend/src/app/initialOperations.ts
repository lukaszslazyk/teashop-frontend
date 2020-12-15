import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSessionCart } from "../domain/cart/actions";
import { createRequestCancelToken } from "../shared/services/requestCancelTokenService";

const useInitialOperations = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchSessionCart(cancelToken));
        return () => cancelToken.cancel();
    }, [dispatch]);
};

export default useInitialOperations;
