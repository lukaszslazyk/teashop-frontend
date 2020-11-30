import { Grid, Step, StepLabel, Stepper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Cart } from "../../domain/cart/models";
import MainLayout from "../../layouts/main";
import InformationStepViewContainer from "./components/InformationStepView/container";
import PaymentStepViewContainer from "./components/PaymentStepView/container";
import ProgressStepLayoutContainer from "./components/ProgressStepLayout/container";
import ShippingStepView from "./components/ShippingStepView";
import SummaryStepView from "./components/SummaryStepView";
import useStyles from "./styles";

interface Props {
    cart: Cart
}

const CheckoutPage = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const { cart } = props;

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
        if (cart.items.length === 0)
            history.push("/cart");
    }, [cart, history]);

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
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default CheckoutPage;
