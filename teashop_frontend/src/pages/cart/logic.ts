import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { fetchSessionCart } from "../../domain/cart/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartIsFetching = useSelector(
        (state: RootState) => state.cart.cartIsFetching
    );
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.cart.errorOccurred
    );
    const errorType = useSelector((state: RootState) => state.cart.errorType);
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchSessionCart(cancelToken));
        return () => cancelToken.cancel();
    }, [dispatch]);

    const cartIsEmpty = (): boolean => cart.items.length === 0;

    const getErrorMessage = (): string => {
        if (errorType === ApiErrorType.Timeout)
            return "Your cart is currently unavailable.\nPlease try again later.";
        else if (errorType === ApiErrorType.Unexpected)
            return "We've encountered some issues on our servers.\nPlease try again later.";
        return "";
    };

    return {
        cart,
        cartIsFetching,
        cartUpdateIsSending,
        errorOccurred,
        cartIsEmpty,
        getErrorMessage,
    };
};

export default useLogic;
