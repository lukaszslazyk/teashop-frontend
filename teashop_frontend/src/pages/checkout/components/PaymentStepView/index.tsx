import { Grid } from "@material-ui/core";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PaymentCard, PaymentMethod } from "../../../../domain/order/models";
import NavButtonsPanel from "../NavButtonsPanel";
import PaymentCardForm from "../PaymentCardForm";
import PaymentMethodFormContainer from "../PaymentMethodForm/container";

interface Props {
    paymentCard: PaymentCard | null;
    chosenPaymentMethod: PaymentMethod | null;
    setPaymentCard: (value: PaymentCard) => void;
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const PaymentStepView = (props: Props) => {
    const emptyPaymentCardFormValues = {
        number: "",
        nameOnCard: "",
        expirationDate: "",
        securityCode: "",
    };
    const paymentCardFormMethods = useForm<PaymentCard>({
        defaultValues: props.paymentCard
            ? props.paymentCard
            : emptyPaymentCardFormValues,
    });

    const paymentCardFormComponent = () => (
        <FormProvider {...paymentCardFormMethods}>
            <PaymentCardForm />
        </FormProvider>
    );

    const handleContinueButtonClick = () => {
        if (
            props.chosenPaymentMethod &&
            props.chosenPaymentMethod.name === "card"
        )
            paymentCardFormMethods.handleSubmit(onPaymentCardFormSubmit)();
    };

    const onPaymentCardFormSubmit = () => {
        props.setPaymentCard(paymentCardFormMethods.getValues());
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
