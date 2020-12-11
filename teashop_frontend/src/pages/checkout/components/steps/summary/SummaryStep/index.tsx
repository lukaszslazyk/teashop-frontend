import { Grid } from "@material-ui/core";
import React from "react";
import NavButtonsPanel from "../../../NavButtonsPanel";
import OrderSummary from "../CheckoutSummary";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const SummaryStep = (props: Props) => (
    <Grid container spacing={4}>
        <Grid item xs={12}>
            <OrderSummary />
        </Grid>
        <Grid item xs={12}>
            <NavButtonsPanel
                onContinueButtonClick={props.onContinueButtonClick}
                onBackButtonClick={props.onBackButtonClick}
                continueButtonLabel="Place order"
                backButtonLabel="Back to Payment"
            />
        </Grid>
    </Grid>
);

export default SummaryStep;
