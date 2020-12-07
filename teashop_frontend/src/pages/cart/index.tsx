import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Cart } from "../../domain/cart/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import {
    RequestCancelToken,
    createRequestCancelToken,
} from "../../shared/services/requestCancelTokenService";
import CartView from "./components/CartView";
import EmptyCartView from "./components/EmptyCartView";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    cartIsFetching: boolean;
    cartUpdateIsSending: boolean;
    errorOccurred: boolean;
    getSessionCart: (cancelToken: RequestCancelToken) => void;
    updateItemQuantity: (
        productId: string,
        quantity: number,
        cancelToken: RequestCancelToken
    ) => void;
    removeItemFromCart: (
        productId: string,
        cancelToken: RequestCancelToken
    ) => void;
}

const CartPage = (props: Props) => {
    const classes = useStyles();
    const [timeoutPassed, setTimeoutPassed] = useState(false);
    const { cartIsFetching, cartUpdateIsSending, getSessionCart } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        setTimeoutPassed(false);
        getSessionCart(cancelToken);
        return () => cancelToken.cancel();
    }, [getSessionCart]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeoutPassed]);

    const cartIsEmpty = (): boolean =>
        props.cart.items.length === 0;

    return (
        <MainLayout>
            {cartIsFetching && timeoutPassed && (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
            {!cartIsFetching && !cartUpdateIsSending && props.errorOccurred && (
                <ErrorInfo errorMessage="Your cart is currently unavailable. Please try again later." />
            )}
            {!cartIsFetching && !props.errorOccurred && (
                <div>
                    {cartIsEmpty() ? (
                        <EmptyCartView />
                    ) : (
                        <CartView cart={props.cart} />
                    )}
                </div>
            )}
        </MainLayout>
    );
};

export default CartPage;
