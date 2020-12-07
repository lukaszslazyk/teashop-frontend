import React from "react";
import { Cart } from "../../../../domain/cart/models";
import OrderItemsView from "../../../../domain/order/components/OrderItemsView";

interface Props {
    cart: Cart;
}

const CheckoutSummaryItemsView = (props: Props) => (
    <OrderItemsView cart={props.cart} />
);

export default CheckoutSummaryItemsView;
