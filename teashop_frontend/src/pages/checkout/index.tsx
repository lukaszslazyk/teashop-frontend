import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
    cartFetchedOnInit: boolean;
    fetchOrderMeta: (cancelToken: RequestCancelToken) => void;
    setCartPrice: (value: number) => void;
}

const CheckoutPage = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const [timeoutPassed, setTimeoutPassed] = useState(false);
    const { cart, cartFetchedOnInit, fetchOrderMeta, setCartPrice } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (cartFetchedOnInit && cart.items.length > 0) {
            setTimeoutPassed(false);
            setCartPrice(calculateCartPrice(cart));
            fetchOrderMeta(cancelToken);
        }
        return () => cancelToken.cancel();
    }, [cart, cartFetchedOnInit, history, fetchOrderMeta, setCartPrice]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [setTimeoutPassed]);

    return (
        <MainLayout>
            {props.orderMetaIsFetching && timeoutPassed && (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
            {!props.orderMetaIsFetching && props.orderMetaErrorOccurred && (
                <ErrorInfo errorMessage="Checkout is currently unavailable." />
            )}
            {!props.orderMetaIsFetching && !props.orderMetaErrorOccurred && (
                <CheckoutMainViewContainer />
            )}
        </MainLayout>
    );
};

export default CheckoutPage;
