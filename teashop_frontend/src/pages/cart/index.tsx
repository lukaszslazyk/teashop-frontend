import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Cart } from "../../domain/cart/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import { RequestCancelToken, createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import CartView from "./components/CartView";
import EmptyCartView from "./components/EmptyCartView";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    isFetching: boolean;
    isSending: boolean;
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
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [disableInteraction, setDisableInteraction] = useState(false);
    const [timeoutPassed, setTimeoutPassed] = useState(false);
    const { isFetching, isSending, getSessionCart } = props;

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

    useEffect(() => {
        if (timeoutPassed)
            if (isFetching || isSending)
                setBackdropOpen(true);
    }, [timeoutPassed, isFetching, isSending]);

    useEffect(() => {
        if (!isFetching && !isSending) {
            setBackdropOpen(false);
            setDisableInteraction(false);
        }
    }, [isFetching, isSending, setBackdropOpen]);

    const updateItemQuantityCallback = (
        productId: string,
        quantity: number
    ) => {
        setDisableInteraction(true);
        setTimeoutPassed(false);
        props.updateItemQuantity(
            productId,
            quantity,
            createRequestCancelToken()
        );
    };

    const removeItemFromCartCallback = (productId: string) => {
        setDisableInteraction(true);
        setTimeoutPassed(false);
        props.removeItemFromCart(productId, createRequestCancelToken());
    };

    return (
        <div>
            <Backdrop
                open={backdropOpen}
                className={classes.backdropProgressContainer}
            >
                <CircularProgress className={classes.backdropProgress} />
            </Backdrop>
            <MainLayout>
                {!props.isFetching && props.errorOccurred && (
                    <ErrorInfo errorMessage="Your cart is currently unavailable. Please try again later." />
                )}
                {!props.isFetching && !props.errorOccurred && (
                    <div>
                        {props.cart.items.length > 0 ? (
                            <CartView
                                cart={props.cart}
                                interactionDisabled={disableInteraction}
                                updateItemQuantityCallback={
                                    updateItemQuantityCallback
                                }
                                removeItemFromCartCallback={
                                    removeItemFromCartCallback
                                }
                            />
                        ) : (
                            <EmptyCartView />
                        )}
                    </div>
                )}
            </MainLayout>
        </div>
    );
};

export default CartPage;