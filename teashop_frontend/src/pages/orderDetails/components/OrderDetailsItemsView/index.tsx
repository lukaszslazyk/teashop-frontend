import React from "react";
import OrderItemsView from "../../../../domain/order/components/OrderItemsView";
import { Order } from "../../../../domain/order/models";

interface Props {
    order: Order;
}

const OrderDetailsItemsView = (props: Props) => (
    <OrderItemsView cart={props.order.cart} />
);

export default OrderDetailsItemsView;
