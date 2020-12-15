import React from "react";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import CartView from "./components/CartView";
import EmptyCartView from "./components/EmptyCartView";
import useLogic from "./logic";

const CartPage = () => {
    const logic = useLogic();
    const { cart, cartFetchedYet, cartUpdateIsSending, errorOccurred } = logic;

    return (
        <MainLayout>
            {!cartFetchedYet && <PageLoadingProgress />}
            {cartFetchedYet && !cartUpdateIsSending && errorOccurred && (
                <ErrorInfo errorMessage={logic.getErrorMessage()} />
            )}
            {cartFetchedYet && !errorOccurred && (
                <div>
                    {logic.cartIsEmpty() ? (
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
