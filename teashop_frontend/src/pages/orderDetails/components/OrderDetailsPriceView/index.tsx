import React from "react";
import OrderPriceView from "../../../../domain/order/components/OrderPriceView";
import { Order } from "../../../../domain/order/models";

interface Props {
    order: Order;
}

const OrderDetailsPriceView = (props: Props) => (
    <OrderPriceView
        totalPrice={props.order.totalPrice}
        shippingPrice={props.order.shippingPrice}
    />
);

export default OrderDetailsPriceView;
