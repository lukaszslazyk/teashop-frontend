import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import routing from "../../configuration/routing";
import { Cart } from "../../domain/cart/models";
import { calculateCartPrice } from "../../domain/cart/services/cartService";
import { fetchOrderMeta, setCartPrice } from "../../domain/order/actions";
import { CheckoutSteps } from "../../domain/order/models";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const isEmpty = (cart: Cart) => cart.items.length === 0;

const isFinalizeStep = (step: number) => step === CheckoutSteps.Finalize;

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
    const checkoutStep = useSelector(
        (state: RootState) => state.order.checkoutStep
    );
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (isEmpty(cart) && !isFinalizeStep(checkoutStep))
            history.push(routing.cart);
    }, [history, checkoutStep, cart]);

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (!orderMetaFetchedSuccessfully)
            dispatch(fetchOrderMeta(cancelToken));
        return () => cancelToken.cancel();
    }, [orderMetaFetchedSuccessfully, dispatch]);

    useEffect(() => {
        if (isEmpty(cart))
            dispatch(setCartPrice(calculateCartPrice(cart)));
    }, [cart, dispatch]);

    const getErrorMessage = (): string => {
        if (
            orderMetaErrorType === ApiErrorType.InvalidResponse ||
            orderMetaErrorType === ApiErrorType.Unexpected
        )
            return "We've encountered some issues on our servers.\nPlease try again later.";
        else if (orderMetaErrorType === ApiErrorType.Timeout)
            return "Checkout is currently unavailable.\nPlease try again later.";
        return "";
    };

    return {
        orderMetaIsFetching,
        orderMetaErrorOccurred,
        getErrorMessage,
    };
};

export default useLogic;
