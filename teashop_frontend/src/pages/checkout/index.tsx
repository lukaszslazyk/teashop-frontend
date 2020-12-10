import React, { useEffect } from "react";
import { Cart } from "../../domain/cart/models";
import { calculateCartPrice } from "../../domain/cart/services/cartService";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../shared/services/requestCancelTokenService";
import CheckoutMainViewContainer from "./components/CheckoutMainView/container";

interface Props {
    orderMetaIsFetching: boolean;
    orderMetaErrorOccurred: boolean;
    cart: Cart;
    cartFetchedYet: boolean;
    cartErrorOccurred: boolean;
    fetchOrderMeta: (cancelToken: RequestCancelToken) => void;
    setCartPrice: (value: number) => void;
}

const CheckoutPage = (props: Props) => {
    const { cart, cartFetchedYet, fetchOrderMeta, setCartPrice } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        fetchOrderMeta(cancelToken);
        return () => cancelToken.cancel();
    }, [fetchOrderMeta]);

    useEffect(() => {
        if (cartFetchedYet && cart.items.length > 0)
            setCartPrice(calculateCartPrice(cart));
    }, [cart, cartFetchedYet, setCartPrice]);

    const dataIsFetching = (): boolean =>
        props.orderMetaIsFetching && !cartFetchedYet;

    const anyErrorOccurred = (): boolean =>
        (!props.orderMetaIsFetching && props.orderMetaErrorOccurred) ||
        (cartFetchedYet && props.cartErrorOccurred);

    const noErrors = (): boolean =>
        !props.orderMetaIsFetching &&
        cartFetchedYet &&
        !props.orderMetaErrorOccurred &&
        !props.cartErrorOccurred;

    return (
        <MainLayout>
            {dataIsFetching() && (
                <PageLoadingProgress />
            )}
            {anyErrorOccurred() && (
                <ErrorInfo errorMessage="Checkout is currently unavailable. Please try again later." />
            )}
            {noErrors() && <CheckoutMainViewContainer />}
        </MainLayout>
    );
};

export default CheckoutPage;
