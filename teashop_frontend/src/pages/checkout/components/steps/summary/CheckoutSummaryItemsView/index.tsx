import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import OrderItemsSummary from "../../../../../../domain/order/components/OrderItemsSummary";

const CheckoutSummaryItemsView = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const totalPrice = useSelector(
        (state: RootState) => state.order.totalPrice
    );
    const shippingFee = useSelector(
        (state: RootState) => state.order.shippingFee
    );
    const paymentFee = useSelector(
        (state: RootState) => state.order.paymentFee
    );

    return (
        <OrderItemsSummary
            cart={cart}
            totalPrice={totalPrice}
            shippingFee={shippingFee}
            paymentFee={paymentFee}
        />
    );
};

export default CheckoutSummaryItemsView;
