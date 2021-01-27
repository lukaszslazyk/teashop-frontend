import React from "react";
import OrderItemsSummary from "../../../../domain/order/components/OrderItemsSummary";
import { Order } from "../../../../domain/order/models";

interface Props {
    order: Order;
}

const OrderDetailsItemsSummary = (props: Props) => (
    <OrderItemsSummary
        cart={props.order.cart}
        totalPrice={props.order.totalPrice}
        shippingPrice={props.order.shippingPrice}
    />
);

export default OrderDetailsItemsSummary;
