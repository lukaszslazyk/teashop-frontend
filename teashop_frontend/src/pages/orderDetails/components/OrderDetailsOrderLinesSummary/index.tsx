import React from "react";
import OrderLinesSummary from "../../../../domain/order/components/OrderLinesSummary";
import { Order } from "../../../../domain/order/models";

interface Props {
    order: Order;
}

const OrderDetailsOrderLinesSummary = (props: Props) => (
    <OrderLinesSummary
        orderLines={props.order.orderLines}
        totalPrice={props.order.totalPrice}
        shippingFee={props.order.shippingFee}
        paymentFee={props.order.paymentFee}
    />
);

export default OrderDetailsOrderLinesSummary;
