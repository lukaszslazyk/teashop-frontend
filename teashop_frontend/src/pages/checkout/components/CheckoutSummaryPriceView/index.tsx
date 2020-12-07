import React from "react";
import OrderPriceView from "../../../../domain/order/components/OrderPriceView";

interface Props {
    totalPrice: number;
    shippingPrice: number;
}

const CheckoutSummaryPriceView = (props: Props) => (
    <OrderPriceView
        totalPrice={props.totalPrice}
        shippingPrice={props.shippingPrice}
    />
);

export default CheckoutSummaryPriceView;
