import { Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    activeStep: number;
}

const CheckoutStepper = (props: Props) => {
    const classes = useStyles();

    return (
        <Stepper
            activeStep={props.activeStep}
            alternativeLabel
            className={classes.stepper}
        >
            <Step>
                <StepLabel>Information</StepLabel>
            </Step>
            <Step>
                <StepLabel>Shipment</StepLabel>
            </Step>
            <Step>
                <StepLabel>Payment</StepLabel>
            </Step>
            <Step>
                <StepLabel>Summary</StepLabel>
            </Step>
        </Stepper>
    );
};

export default CheckoutStepper;
