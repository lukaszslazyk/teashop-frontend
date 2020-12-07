import { Grid, Step, StepLabel, Stepper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Cart } from "../../../../domain/cart/models";
import InformationStepViewContainer from "../InformationStepView/container";
import PaymentStepViewContainer from "../PaymentStepView/container";
import PlaceOrderViewContainer from "../PlaceOrderView/container";
import ProgressStepLayoutContainer from "../ProgressStepLayout/container";
import ShippingStepView from "../ShippingStepView";
import SummaryStepView from "../SummaryStepView";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    cartFetchedYet: boolean;
}

const CheckoutMainView = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const { cart, cartFetchedYet } = props;

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
                    <ProgressStepLayoutContainer>
                        {activeStep === 0 && (
                            <InformationStepViewContainer
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
                            <PaymentStepViewContainer
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                    </ProgressStepLayoutContainer>
                )}
                {activeStep === 3 && (
                    <SummaryStepView
                        onContinueButtonClick={handleContinueButtonClicked}
                        onBackButtonClick={handleBackButtonClicked}
                    />
                )}
                {activeStep === 4 && <PlaceOrderViewContainer />}
            </Grid>
        </Grid>
    );
};

export default CheckoutMainView;