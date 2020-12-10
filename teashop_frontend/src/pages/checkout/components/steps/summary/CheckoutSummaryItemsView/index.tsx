import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import OrderItemsView from "../../../../../../domain/order/components/OrderItemsView";

const CheckoutSummaryItemsView = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);

    return <OrderItemsView cart={cart} />;
};

export default CheckoutSummaryItemsView;
