import { Grid } from "@material-ui/core";
import React from "react";
import { PaymentMethod } from "../../../../domain/order/models";
import NavButtonsPanel from "../NavButtonsPanel";
import PaymentMethodFormContainer from "../PaymentMethodForm/container";

interface Props {
    chosenPaymentMethod: PaymentMethod | null;
    creditCardFormWasValidated: boolean;
    creditCardFormValid: boolean;
    validateCreditCardForm: () => void;
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const PaymentStepView = (props: Props) => {
    const handleContinueButtonClick = () => {
        if (
            props.chosenPaymentMethod &&
            props.chosenPaymentMethod.name === "creditCard"
        ) {
            props.validateCreditCardForm();
            if (props.creditCardFormWasValidated && props.creditCardFormValid)
                props.onContinueButtonClick();
        } else
            props.onContinueButtonClick();
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <PaymentMethodFormContainer />
            </Grid>
            <Grid item xs={12}>
                <NavButtonsPanel
                    onContinueButtonClick={handleContinueButtonClick}
                    onBackButtonClick={props.onBackButtonClick}
                    backButtonLabel="Back to Information"
                />
            </Grid>
        </Grid>
    );
};

export default PaymentStepView;
