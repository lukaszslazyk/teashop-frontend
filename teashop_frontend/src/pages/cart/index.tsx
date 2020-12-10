import React from "react";
import { Cart } from "../../domain/cart/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import CartView from "./components/CartView";
import EmptyCartView from "./components/EmptyCartView";

interface Props {
    cart: Cart;
    cartFetchedYet: boolean;
    cartUpdateIsSending: boolean;
    errorOccurred: boolean;
}

const CartPage = (props: Props) => {
    const { cartFetchedYet, cartUpdateIsSending } = props;

    const cartIsEmpty = (): boolean =>
        props.cart.items.length === 0;

    return (
        <MainLayout>
            {!cartFetchedYet && (
                <PageLoadingProgress />
            )}
            {cartFetchedYet && !cartUpdateIsSending && props.errorOccurred && (
                <ErrorInfo errorMessage="Your cart is currently unavailable. Please try again later." />
            )}
            {cartFetchedYet && !props.errorOccurred && (
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
