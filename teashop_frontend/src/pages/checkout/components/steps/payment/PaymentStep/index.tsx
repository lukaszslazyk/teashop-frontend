import { Grid } from "@material-ui/core";
import React from "react";
import { FormProvider } from "react-hook-form";
import NavButtonsPanel from "../../../NavButtonsPanel";
import PaymentCardForm from "../PaymentCardForm";
import PaymentMethodForm from "../PaymentMethodForm";
import useLogic from "./logic";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const PaymentStep = (props: Props) => {
    const {
        paymentCardFormMethods,
        handleContinueButtonClicked,
        handleBackButtonClicked,
    } = useLogic(props.onContinueButtonClick, props.onBackButtonClick);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <PaymentMethodForm
                    paymentCardFormComponent={
                        <FormProvider {...paymentCardFormMethods}>
                            <PaymentCardForm />
                        </FormProvider>
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <NavButtonsPanel
                    onContinueButtonClick={handleContinueButtonClicked}
                    onBackButtonClick={handleBackButtonClicked}
                    backButtonLabel="Back to Shipping"
                />
            </Grid>
        </Grid>
    );
};

export default PaymentStep;
