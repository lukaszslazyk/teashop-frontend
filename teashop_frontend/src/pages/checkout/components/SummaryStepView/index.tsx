import { Grid } from "@material-ui/core";
import React from "react";
import OrderSummaryContainer from "../CheckoutSummary/container";
import NavButtonsPanel from "../NavButtonsPanel";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const SummaryStepView = (props: Props) => (
    <Grid container spacing={4}>
        <Grid item xs={12}>
            <OrderSummaryContainer />
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

export default SummaryStepView;