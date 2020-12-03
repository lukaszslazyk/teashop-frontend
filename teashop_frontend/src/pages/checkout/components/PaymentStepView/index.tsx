import { Grid } from "@material-ui/core";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreditCard, PaymentMethod } from "../../../../domain/order/models";
import CreditCardForm from "../CreditCardForm";
import NavButtonsPanel from "../NavButtonsPanel";
import PaymentMethodFormContainer from "../PaymentMethodForm/container";

interface Props {
    creditCard: CreditCard,
    chosenPaymentMethod: PaymentMethod | null;
    setCreditCard: (value: CreditCard) => void;
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const PaymentStepView = (props: Props) => {
    const creditCardFormMethods = useForm<CreditCard>({
        defaultValues: props.creditCard
    });

    const creditCardFormComponent = () => (
        <FormProvider {...creditCardFormMethods}>
            <CreditCardForm />
        </FormProvider>
    );

    const handleContinueButtonClick = () => {
        if (
            props.chosenPaymentMethod &&
            props.chosenPaymentMethod.name === "creditCard"
        )
            creditCardFormMethods.handleSubmit(onCreditCardFormSubmit)();
    };

    const onCreditCardFormSubmit = () => {
        props.setCreditCard(creditCardFormMethods.getValues());
        props.onContinueButtonClick();
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <PaymentMethodFormContainer
                    creditCardFormComponent={creditCardFormComponent()}
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
