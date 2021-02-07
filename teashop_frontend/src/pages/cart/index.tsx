import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import CartView from "./components/CartView";
import useLogic from "./logic";

const CartPage = () => {
    const {
        cart,
        cartFetchedYet,
        cartUpdateIsSending,
        errorOccurred,
        getErrorMessage,
        cartIsEmpty,
    } = useLogic();

    return (
        <div>
            {!cartFetchedYet && <PageLoadingProgress />}
            {cartFetchedYet && !cartUpdateIsSending && errorOccurred && (
                <ErrorInfo errorMessage={getErrorMessage()} />
            )}
            {cartFetchedYet && !errorOccurred && (
                <div>
                    {cartIsEmpty() ? (
                        <ErrorInfo
                            title="Your cart is empty"
                            errorMessage="Continue shopping and add some items to your cart."
                        />
                    ) : (
                        <CartView cart={cart} />
                    )}
                </div>
            )}
        </div>
    );
};

export default CartPage;
