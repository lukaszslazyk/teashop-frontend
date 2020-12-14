import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { calculateCartPrice } from "../../domain/cart/services/cartService";
import { fetchOrderMeta, setCartPrice } from "../../domain/order/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";

const useLogic = () => {
    const orderMetaIsFetching = useSelector(
        (state: RootState) => state.order.orderMetaIsFetching
    );
    const orderMetaErrorOccurred = useSelector(
        (state: RootState) => state.order.orderMetaErrorOccurred
    );
    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartFetchedYet = useSelector(
        (state: RootState) => state.cart.cartFetchedYet
    );
    const cartErrorOccurred = useSelector(
        (state: RootState) => state.cart.errorOccurred
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

    const anyErrorOccurred = (): boolean =>
        (!orderMetaIsFetching && orderMetaErrorOccurred) ||
        (cartFetchedYet && cartErrorOccurred);

    const noErrors = (): boolean =>
        !orderMetaIsFetching &&
        cartFetchedYet &&
        !orderMetaErrorOccurred &&
        !cartErrorOccurred;

    return {
        dataIsFetching,
        anyErrorOccurred,
        noErrors,
    };
};

export default useLogic;