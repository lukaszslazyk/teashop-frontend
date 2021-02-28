import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import CheckoutSummaryCustomerProvidedInfoView from "../CheckoutSummaryCustomerProvidedInfoView";
import CheckoutSummaryOrderLinesView from "../CheckoutSummaryOrderLinesView";

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
                <CheckoutSummaryCustomerProvidedInfoView />
            </Grid>
            <Grid item xs={12}>
                <CheckoutSummaryOrderLinesView />
            </Grid>
        </Grid>
    );
};

export default CheckoutSummary;
