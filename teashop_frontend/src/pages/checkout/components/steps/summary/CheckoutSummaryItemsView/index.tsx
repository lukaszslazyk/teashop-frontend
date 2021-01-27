import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import OrderItemsSummary from "../../../../../../domain/order/components/OrderItemsSummary";

const CheckoutSummaryItemsView = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const totalPrice = useSelector(
        (state: RootState) => state.order.totalPrice
    );
    const shippingPrice = useSelector(
        (state: RootState) => state.order.shippingPrice
    );

    return (
        <OrderItemsSummary
            cart={cart}
            totalPrice={totalPrice}
            shippingPrice={shippingPrice}
        />
    );
};

export default CheckoutSummaryItemsView;
