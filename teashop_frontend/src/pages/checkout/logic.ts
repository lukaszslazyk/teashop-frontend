import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { calculateCartPrice } from "../../domain/cart/services/cartService";
import { fetchOrderMeta, setCartPrice } from "../../domain/order/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = () => {
    const orderMetaIsFetching = useSelector(
        (state: RootState) => state.order.orderMetaIsFetching
    );
    const orderMetaErrorOccurred = useSelector(
        (state: RootState) => state.order.orderMetaErrorOccurred
    );
    const orderMetaErrorType = useSelector(
        (state: RootState) => state.order.orderErrorType
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
        dispatch(fetchOrderMeta(cancelToken));
        return () => cancelToken.cancel();
    }, [dispatch]);

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
            cartErrorType === ApiErrorType.Unexpected
        )
            return "We've encountered some issues on our servers. Please try again later.";
        else if (
            orderMetaErrorType === ApiErrorType.Unavailable ||
            cartErrorType === ApiErrorType.Unavailable
        )
            return "Checkout is currently unavailable. Please try again later.";
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
