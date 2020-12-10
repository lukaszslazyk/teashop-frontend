import React from "react";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import CartView from "./components/CartView";
import EmptyCartView from "./components/EmptyCartView";
import useLogic from "./logic";

const CartPage = () => {
    const {
        cart,
        cartFetchedYet,
        cartUpdateIsSending,
        errorOccurred,
        cartIsEmpty,
    } = useLogic();

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
