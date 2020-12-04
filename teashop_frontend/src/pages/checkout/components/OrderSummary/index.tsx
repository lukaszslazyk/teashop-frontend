import { Grid } from "@material-ui/core";
import React from "react";
import { Cart } from "../../../../domain/cart/models";
import {
    ContactInfo,
    PaymentMethod,
    Address,
    ShippingMethod,
} from "../../../../domain/order/models";
import OrderSummaryInfoView from "../OrderSummaryInfoView";
import OrderSummaryItemsView from "../OrderSummaryItemsView";
import OrderSummaryPriceView from "../OrderSummaryPriceView";

interface Props {
    contactInfo: ContactInfo;
    shippingAddress: Address;
    chosenShippingMethod: ShippingMethod | null;
    chosenPaymentMethod: PaymentMethod | null;
    cart: Cart;
}

const OrderSummary = (props: Props) => {
    if (!props.chosenShippingMethod || !props.chosenPaymentMethod)
        return null;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <OrderSummaryInfoView
                    contactInfo={props.contactInfo}
                    shippingAddress={props.shippingAddress}
                    chosenShippingMethod={props.chosenShippingMethod}
                    chosenPaymentMethod={props.chosenPaymentMethod}
                />
            </Grid>
            <Grid item xs={12}>
                <OrderSummaryItemsView cart={props.cart} />
            </Grid>
            <Grid item xs={12}>
                <OrderSummaryPriceView
                    cart={props.cart}
                    chosenShippingMethod={props.chosenShippingMethod}
                />
            </Grid>
        </Grid>
    );
};

export default OrderSummary;
