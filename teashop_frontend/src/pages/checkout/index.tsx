import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Cart } from "../../domain/cart/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import { createRequestCancelToken, RequestCancelToken } from "../../shared/services/requestCancelTokenService";
import CheckoutStepsView from "./components/CheckoutStepsView";
import useStyles from "./styles";

interface Props {
    orderMetaIsFetching: boolean;
    orderMetaErrorOccurred: boolean;
    cart: Cart,
    cartFetchedOnInit: boolean;
    fetchOrderMeta: (cancelToken: RequestCancelToken) => void;
}

const CheckoutPage = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const [timeoutPassed, setTimeoutPassed] = useState(false);
    const { cart, cartFetchedOnInit, fetchOrderMeta } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (cartFetchedOnInit && cart.items.length === 0)
            history.push("/cart");
        else {
            setTimeoutPassed(false);
            fetchOrderMeta(cancelToken);
        }
        return () => cancelToken.cancel();
    }, [cart, cartFetchedOnInit, history, fetchOrderMeta]);

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
                <CheckoutStepsView />
            )}
        </MainLayout>
    );
};

export default CheckoutPage;
