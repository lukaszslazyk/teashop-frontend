import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { Cart } from "../../domain/cart/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import CartView from "./components/CartView";
import EmptyCartView from "./components/EmptyCartView";
import useStyles from "./styles";
import axios, { CancelTokenSource } from "axios";

interface Props {
    cart: Cart;
    isFetching: boolean;
    isSending: boolean;
    errorOccurred: boolean;
    getSessionCart: (cancelToken: CancelTokenSource) => void;
    updateItemQuantity: (
        productId: string,
        quantity: number,
        cancelToken: CancelTokenSource
    ) => void;
    removeItemFromCart: (
        productId: string,
        cancelToken: CancelTokenSource
    ) => void;
}

const CartPage = (props: Props) => {
    const classes = useStyles();
    const [backdropOpen, setBackdropOpen] = React.useState(false);
    const [disableInteraction, setDisableInteraction] = React.useState(false);
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);
    const { isFetching, isSending, getSessionCart } = props;

    useEffect(() => {
        let cancelToken = axios.CancelToken.source();
        setTimeoutPassed(false);
        getSessionCart(cancelToken);
        return () => cancelToken.cancel();
    }, [getSessionCart]);

    useEffect(() => {
        let timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeoutPassed]);

    useEffect(() => {
        if (timeoutPassed) {
            if (isFetching || isSending) setBackdropOpen(true);
        }
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
            axios.CancelToken.source()
        );
    };

    const removeItemFromCartCallback = (productId: string) => {
        setDisableInteraction(true);
        setTimeoutPassed(false);
        props.removeItemFromCart(productId, axios.CancelToken.source());
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
