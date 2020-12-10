import { Grid, Step, StepLabel, Stepper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import InformationStepView from "../InformationStepView";
import PaymentStepView from "../PaymentStepView";
import PlaceOrderView from "../PlaceOrderView";
import ProgressStepLayout from "../ProgressStepLayout";
import ShippingStepView from "../ShippingStepView";
import SummaryStepView from "../SummaryStepView";
import useStyles from "./styles";

const CheckoutMainView = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartFetchedYet = useSelector(
        (state: RootState) => state.cart.cartFetchedYet
    );
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();
    const classes = useStyles();

    const handleContinueButtonClicked = () => {
        setActiveStep(activeStep => activeStep + 1);
    };

    const handleBackButtonClicked = () => {
        if (activeStep === 0)
            history.push("/cart");
        else
            setActiveStep(activeStep => activeStep - 1);
    };

    useEffect(() => {
        if (activeStep === 0 && cartFetchedYet && cart.items.length === 0)
            history.push("/cart");
    }, [activeStep, cart, cartFetchedYet, history]);

    return (
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
                {activeStep < 3 && (
                    <ProgressStepLayout>
                        {activeStep === 0 && (
                            <InformationStepView
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                        {activeStep === 1 && (
                            <ShippingStepView
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                        {activeStep === 2 && (
                            <PaymentStepView
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                    </ProgressStepLayout>
                )}
                {activeStep === 3 && (
                    <SummaryStepView
                        onContinueButtonClick={handleContinueButtonClicked}
                        onBackButtonClick={handleBackButtonClicked}
                    />
                )}
                {activeStep === 4 && <PlaceOrderView />}
            </Grid>
        </Grid>
    );
};

export default CheckoutMainView;
