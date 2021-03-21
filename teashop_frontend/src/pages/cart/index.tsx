import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingIndicator from "../../shared/components/PageLoadingIndicator";
import CartView from "./components/CartView";
import useLogic from "./logic";

const CartPage = () => {
    const {
        pageInitialized,
        cart,
        cartIsFetching,
        cartUpdateIsSending,
        errorOccurred,
        getErrorMessage,
        cartIsEmpty,
    } = useLogic();

    if (!pageInitialized)
        return null;

    return (
        <div>
            {cartIsFetching && <PageLoadingIndicator />}
            {!cartIsFetching && !cartUpdateIsSending && errorOccurred && (
                <ErrorInfo errorMessage={getErrorMessage()} />
            )}
            {!cartIsFetching && !errorOccurred && (
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
