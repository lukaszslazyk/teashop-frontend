import { Grid, Hidden, Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import CheckoutStepper from "../CheckoutStepper";
import CheckoutStepTitle from "../CheckoutStepTitle";
import ProgressStepLayout from "../ProgressStepLayout";
import FinalizeStep from "../steps/finalize/FinalizeStep";
import InformationStep from "../steps/information/InformationStep";
import PaymentStep from "../steps/payment/PaymentStep";
import ShippingStep from "../steps/shipping/ShippingStep";
import SummaryStep from "../steps/summary/SummaryStep";
import useLogic from "./logic";

const CheckoutMainView = () => {
    const logic = useLogic();
    const { activeStep } = logic;

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Hidden xsDown>
                    <CheckoutStepper activeStep={activeStep} />
                </Hidden>
                <Hidden smUp>
                    <CheckoutStepTitle activeStep={activeStep} />
                </Hidden>
            </Grid>
            <Grid item xs={12}>
                {activeStep < 3 && (
                    <ProgressStepLayout>
                        {activeStep === 0 && (
                            <InformationStep
                                onContinueButtonClick={
                                    logic.handleContinueButtonClicked
                                }
                                onBackButtonClick={
                                    logic.handleBackButtonClicked
                                }
                            />
                        )}
                        {activeStep === 1 && (
                            <ShippingStep
                                onContinueButtonClick={
                                    logic.handleContinueButtonClicked
                                }
                                onBackButtonClick={
                                    logic.handleBackButtonClicked
                                }
                            />
                        )}
                        {activeStep === 2 && (
                            <PaymentStep
                                onContinueButtonClick={
                                    logic.handleContinueButtonClicked
                                }
                                onBackButtonClick={
                                    logic.handleBackButtonClicked
                                }
                            />
                        )}
                    </ProgressStepLayout>
                )}
                {activeStep === 3 && (
                    <SummaryStep
                        onContinueButtonClick={
                            logic.handleContinueButtonClicked
                        }
                        onBackButtonClick={logic.handleBackButtonClicked}
                    />
                )}
                {activeStep === 4 && <FinalizeStep />}
            </Grid>
        </Grid>
    );
};

export default CheckoutMainView;
