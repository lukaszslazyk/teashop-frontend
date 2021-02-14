import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import { CheckoutSteps } from "../../../../domain/order/models";
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
                {activeStep < CheckoutSteps.Summary && (
                    <ProgressStepLayout>
                        {activeStep === CheckoutSteps.Information && (
                            <CustomerInformationStep
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                        {activeStep === CheckoutSteps.Shipping && (
                            <ShippingStep
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                        {activeStep === CheckoutSteps.Payment && (
                            <PaymentStep
                                onContinueButtonClick={
                                    handleContinueButtonClicked
                                }
                                onBackButtonClick={handleBackButtonClicked}
                            />
                        )}
                    </ProgressStepLayout>
                )}
                {activeStep === CheckoutSteps.Summary && (
                    <SummaryStep
                        onContinueButtonClick={handleContinueButtonClicked}
                        onBackButtonClick={handleBackButtonClicked}
                    />
                )}
                {activeStep === CheckoutSteps.Finalize && <FinalizeStep />}
            </Grid>
        </Grid>
    );
};

export default CheckoutMainView;
