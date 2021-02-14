import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { calculateCartPrice } from "../../domain/cart/services/cartService";
import { fetchOrderMeta, setCartPrice } from "../../domain/order/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = () => {
    const orderMetaFetchedSuccessfully = useSelector(
        (state: RootState) => state.order.orderMetaFetchedSuccessfully
    );
    const orderMetaIsFetching = useSelector(
        (state: RootState) => state.order.orderMetaIsFetching
    );
    const orderMetaErrorOccurred = useSelector(
        (state: RootState) => state.order.orderMetaErrorOccurred
    );
    const orderMetaErrorType = useSelector(
        (state: RootState) => state.order.orderMetaErrorType
    );
    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartFetchedYet = useSelector(
        (state: RootState) => state.cart.cartFetchedYet
    );
    const cartErrorOccurred = useSelector(
        (state: RootState) => state.cart.errorOccurred
    );
    const cartErrorType = useSelector(
        (state: RootState) => state.cart.errorType
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (!orderMetaFetchedSuccessfully)
            dispatch(fetchOrderMeta(cancelToken));
        return () => cancelToken.cancel();
    }, [orderMetaFetchedSuccessfully, dispatch]);

    useEffect(() => {
        if (cartFetchedYet && cart.items.length > 0)
            dispatch(setCartPrice(calculateCartPrice(cart)));
    }, [cart, cartFetchedYet, dispatch]);

    const dataIsFetching = (): boolean =>
        orderMetaIsFetching && !cartFetchedYet;

    const anyErrors = (): boolean =>
        (!orderMetaIsFetching && orderMetaErrorOccurred) ||
        (cartFetchedYet && cartErrorOccurred);

    const noErrors = (): boolean =>
        !orderMetaIsFetching &&
        cartFetchedYet &&
        !orderMetaErrorOccurred &&
        !cartErrorOccurred;

    const getErrorMessage = (): string => {
        if (
            orderMetaErrorType === ApiErrorType.Unexpected ||
            orderMetaErrorType === ApiErrorType.InvalidResponse ||
            cartErrorType === ApiErrorType.Unexpected
        )
            return "We've encountered some issues on our servers.\nPlease try again later.";
        else if (
            orderMetaErrorType === ApiErrorType.Timeout ||
            cartErrorType === ApiErrorType.Timeout
        )
            return "Checkout is currently unavailable.\nPlease try again later.";
        return "";
    };

    return {
        dataIsFetching,
        anyErrors,
        noErrors,
        getErrorMessage,
    };
};

export default useLogic;
