import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { Cart } from "../../domain/cart/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import CartView from "./components/CartView";
import EmptyCartView from "./components/EmptyCartView";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    isFetching: boolean;
    isSending: boolean;
    errorOccurred: boolean;
    getSessionCart: () => void;
}

const CartPage = (props: Props) => {
    const classes = useStyles();
    const [backdropOpen, setBackdropOpen] = React.useState(false);
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);

    const getSessionCart = props.getSessionCart;
    useEffect(() => {
        setTimeoutPassed(false);
        getSessionCart();
    }, [getSessionCart]);

    useEffect(() => {
        setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
    }, [timeoutPassed]);

    const isFetching = props.isFetching;
    useEffect(() => {
        if (isFetching && timeoutPassed) setBackdropOpen(true);
        if (!isFetching) setBackdropOpen(false);
    }, [isFetching, timeoutPassed, setBackdropOpen]);

    return (
        <MainLayout>
            <Backdrop open={backdropOpen}>
                <CircularProgress className={classes.backdropProgress} />
            </Backdrop>
            {!props.isFetching && props.errorOccurred && (
                <ErrorInfo errorMessage="Your cart is currently unavailable. Please try again later." />
            )}
            {!props.isFetching && !props.errorOccurred && (
                <div>
                    {props.cart.items.length > 0 ? (
                        <CartView cart={props.cart} />
                    ) : (
                        <EmptyCartView />
                    )}
                </div>
            )}
        </MainLayout>
    );
};

export default CartPage;
