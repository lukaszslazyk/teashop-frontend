import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
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
            {cartIsFetching && <PageLoadingProgress />}
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
