import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import CheckoutSummaryInfoView from "../CheckoutSummaryInfoView";
import CheckoutSummaryItemsView from "../CheckoutSummaryItemsView";
import CheckoutSummaryPriceView from "../CheckoutSummaryPriceView";

const CheckoutSummary = () => {
    const chosenShippingMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenShippingMethodName
    );
    const chosenPaymentMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenPaymentMethodName
    );

    if (chosenShippingMethodName === "" || chosenPaymentMethodName === "")
        return null;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CheckoutSummaryInfoView />
            </Grid>
            <Grid item xs={12}>
                <CheckoutSummaryItemsView />
            </Grid>
            <Grid item xs={12}>
                <CheckoutSummaryPriceView />
            </Grid>
        </Grid>
    );
};

export default CheckoutSummary;
