import { Grid } from "@material-ui/core";
import React from "react";
import CheckoutSummaryInfoViewContainer from "../CheckoutSummaryInfoView/container";
import CheckoutSummaryItemsViewContainer from "../CheckoutSummaryItemsView/container";
import CheckoutSummaryPriceViewContainer from "../CheckoutSummaryPriceView/container";

interface Props {
    chosenShippingMethodName: string;
    chosenPaymentMethodName: string;
}

const CheckoutSummary = (props: Props) => {
    if (
        props.chosenShippingMethodName === "" ||
        props.chosenPaymentMethodName === ""
    )
        return null;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CheckoutSummaryInfoViewContainer />
            </Grid>
            <Grid item xs={12}>
                <CheckoutSummaryItemsViewContainer />
            </Grid>
            <Grid item xs={12}>
                <CheckoutSummaryPriceViewContainer />
            </Grid>
        </Grid>
    );
};

export default CheckoutSummary;
