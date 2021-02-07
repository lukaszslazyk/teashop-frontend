import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import CheckoutStepper from "../CheckoutStepper";
import CheckoutStepTitle from "../CheckoutStepTitle";
import ProgressStepLayout from "../ProgressStepLayout";
import CustomerInformationStep from "../steps/customerInformation/CustomerInformationStep";
import FinalizeStep from "../steps/finalize/FinalizeStep";
import PaymentStep from "../steps/payment/PaymentStep";
import ShippingStep from "../steps/shipping/ShippingStep";
import SummaryStep from "../steps/summary/SummaryStep";
import useLogic from "./logic";

const CheckoutMainView = () => {
    const {
        activeStep,
        handleContinueButtonClicked,
        handleBackButtonClicked,
    } = useLogic();

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
                            <CustomerInformationStep
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                        {activeStep === 1 && (
                            <ShippingStep
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                        {activeStep === 2 && (
                            <PaymentStep
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                    </ProgressStepLayout>
                )}
                {activeStep === 3 && (
                    <SummaryStep
                        onContinueButtonClick={handleContinueButtonClicked}
                        onBackButtonClick={handleBackButtonClicked}
                    />
                )}
                {activeStep === 4 && <FinalizeStep />}
            </Grid>
        </Grid>
    );
};

export default CheckoutMainView;
