import { Grid } from "@material-ui/core";
import React from "react";
import NavButtonsPanel from "../../../NavButtonsPanel";
import ShippingMethodForm from "../ShippingMethodForm";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const ShippingStep = (props: Props) => (
    <Grid container spacing={4}>
        <Grid item xs={12}>
            <ShippingMethodForm />
        </Grid>
        <Grid item xs={12}>
            <NavButtonsPanel
                onContinueButtonClick={props.onContinueButtonClick}
                onBackButtonClick={props.onBackButtonClick}
                backButtonLabel="Back to Information"
            />
        </Grid>
    </Grid>
);

export default ShippingStep;
