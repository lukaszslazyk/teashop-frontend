import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import CartView from "./components/CartView";
import EmptyCartView from "./components/EmptyCartView";

const CartPage = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartFetchedYet = useSelector(
        (state: RootState) => state.cart.cartFetchedYet
    );
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.cart.errorOccurred
    );

    const cartIsEmpty = (): boolean => cart.items.length === 0;

    return (
        <MainLayout>
            {!cartFetchedYet && <PageLoadingProgress />}
            {cartFetchedYet && !cartUpdateIsSending && errorOccurred && (
                <ErrorInfo errorMessage="Your cart is currently unavailable. Please try again later." />
            )}
            {cartFetchedYet && !errorOccurred && (
                <div>
                    {cartIsEmpty() ? (
                        <EmptyCartView />
                    ) : (
                        <CartView cart={cart} />
                    )}
                </div>
            )}
        </MainLayout>
    );
};

export default CartPage;
