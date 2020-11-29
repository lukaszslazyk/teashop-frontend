import { Grid, Step, StepLabel, Stepper } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import MainLayout from "../../layouts/main";
import InformationStepViewContainer from "./components/InformationStepView/container";
import ProgressStepLayoutContainer from "./components/ProgressStepLayout/container";
import ShippingStepView from "./components/ShippingStepView";
import useStyles from "./styles";

const OrderPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);

    const handleContinueButtonClicked = () => {
        setActiveStep(activeStep => activeStep + 1);
    };

    const handleBackButtonClicked = () => {
        if (activeStep === 0)
            history.push("/cart");
        else
            setActiveStep(activeStep => activeStep - 1);
    };

    return (
        <MainLayout>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Stepper
                        activeStep={activeStep}
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
                </Grid>
                <Grid item xs={12}>
                    {activeStep !== 3 && (
                        <ProgressStepLayoutContainer>
                            {activeStep === 0 && (
                                <InformationStepViewContainer
                                    onContinueButtonClick={
                                        handleContinueButtonClicked
                                    }
                                    onBackButtonClick={
                                        handleBackButtonClicked
                                    }
                                />
                            )}
                            {activeStep === 1 && (
                                <ShippingStepView
                                    onContinueButtonClick={
                                        handleContinueButtonClicked
                                    }
                                    onBackButtonClick={
                                        handleBackButtonClicked
                                    }
                                />
                            )}
                        </ProgressStepLayoutContainer>
                    )}
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default OrderPage;
