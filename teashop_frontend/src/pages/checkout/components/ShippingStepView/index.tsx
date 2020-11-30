import { Grid } from "@material-ui/core";
import React from "react";
import NavButtonsPanel from "../NavButtonsPanel";
import ShippingMethodFormContainer from "../ShippingMethodForm/container";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const ShippingStepView = (props: Props) => (
    <Grid container spacing={4}>
        <Grid item xs={12}>
            <ShippingMethodFormContainer />
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

export default ShippingStepView;
