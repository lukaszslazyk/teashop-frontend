import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import OrderLinesSummary from "../../../../../../domain/order/components/OrderLinesSummary";

const CheckoutSummaryOrderLinesView = () => {
    const orderLines = useSelector(
        (state: RootState) => state.order.orderLines
    );
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
        <OrderLinesSummary
            orderLines={orderLines}
            totalPrice={totalPrice}
            shippingFee={shippingFee}
            paymentFee={paymentFee}
        />
    );
};

export default CheckoutSummaryOrderLinesView;
