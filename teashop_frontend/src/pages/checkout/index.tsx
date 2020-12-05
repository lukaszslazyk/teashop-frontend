import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState } from "react";
import { Cart } from "../../domain/cart/models";
import { calculateCartPrice } from "../../domain/cart/services/cartService";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../shared/services/requestCancelTokenService";
import CheckoutMainViewContainer from "./components/CheckoutMainView/container";
import useStyles from "./styles";

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
    const classes = useStyles();
    const [timeoutPassed, setTimeoutPassed] = useState(false);
    const { cart, cartFetchedYet, fetchOrderMeta, setCartPrice } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        setTimeoutPassed(false);
        fetchOrderMeta(cancelToken);
        return () => cancelToken.cancel();
    }, [fetchOrderMeta]);

    useEffect(() => {
        if (cartFetchedYet && cart.items.length > 0)
            setCartPrice(calculateCartPrice(cart));
    }, [cart, cartFetchedYet, setCartPrice]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [setTimeoutPassed]);

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
            {dataIsFetching() && timeoutPassed && (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
            {anyErrorOccurred() && (
                <ErrorInfo errorMessage="Checkout is currently unavailable. Please try again later." />
            )}
            {noErrors() && <CheckoutMainViewContainer />}
        </MainLayout>
    );
};

export default CheckoutPage;
