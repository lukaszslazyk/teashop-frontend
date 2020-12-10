import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import OrderPriceView from "../../../../../../domain/order/components/OrderPriceView";

const CheckoutSummaryPriceView = () => {
    const totalPrice = useSelector(
        (state: RootState) => state.order.totalPrice
    );
    const shippingPrice = useSelector(
        (state: RootState) => state.order.shippingPrice
    );

    return (
        <OrderPriceView totalPrice={totalPrice} shippingPrice={shippingPrice} />
    );
};

export default CheckoutSummaryPriceView;
