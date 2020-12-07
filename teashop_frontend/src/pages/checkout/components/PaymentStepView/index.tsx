import { Grid } from "@material-ui/core";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PaymentCardFormData } from "../../../../domain/order/models";
import NavButtonsPanel from "../NavButtonsPanel";
import PaymentCardForm from "../PaymentCardForm";
import PaymentMethodFormContainer from "../PaymentMethodForm/container";

interface Props {
    paymentCardFormData: PaymentCardFormData;
    chosenPaymentMethodName: string;
    setPaymentCardFormData: (value: PaymentCardFormData) => void;
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const PaymentStepView = (props: Props) => {
    const paymentCardFormMethods = useForm<PaymentCardFormData>({
        defaultValues: props.paymentCardFormData
    });

    const paymentCardFormComponent = () => (
        <FormProvider {...paymentCardFormMethods}>
            <PaymentCardForm />
        </FormProvider>
    );

    const handleContinueButtonClick = () => {
        if (props.chosenPaymentMethodName === "card")
            paymentCardFormMethods.handleSubmit(onPaymentCardFormSubmit)();
    };

    const onPaymentCardFormSubmit = () => {
        props.setPaymentCardFormData(paymentCardFormMethods.getValues());
        props.onContinueButtonClick();
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <PaymentMethodFormContainer
                    paymentCardFormComponent={paymentCardFormComponent()}
                />
            </Grid>
            <Grid item xs={12}>
                <NavButtonsPanel
                    onContinueButtonClick={handleContinueButtonClick}
                    onBackButtonClick={props.onBackButtonClick}
                    backButtonLabel="Back to Shipping"
                />
            </Grid>
        </Grid>
    );
};

export default PaymentStepView;
