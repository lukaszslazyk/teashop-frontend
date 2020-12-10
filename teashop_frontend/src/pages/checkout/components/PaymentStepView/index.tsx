import { Grid } from "@material-ui/core";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { setPaymentCardFormData } from "../../../../domain/order/actions";
import { PaymentCardFormData } from "../../../../domain/order/models";
import NavButtonsPanel from "../NavButtonsPanel";
import PaymentCardForm from "../PaymentCardForm";
import PaymentMethodForm from "../PaymentMethodForm";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const PaymentStepView = (props: Props) => {
    const paymentCardFormData = useSelector(
        (state: RootState) => state.order.orderFormData.paymentCardFormData
    );
    const chosenPaymentMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenPaymentMethodName
    );
    const dispatch = useDispatch();
    const paymentCardFormMethods = useForm<PaymentCardFormData>({
        defaultValues: paymentCardFormData,
    });

    const paymentCardFormComponent = () => (
        <FormProvider {...paymentCardFormMethods}>
            <PaymentCardForm />
        </FormProvider>
    );

    const handleContinueButtonClick = () => {
        if (chosenPaymentMethodName === "card")
            paymentCardFormMethods.handleSubmit(onPaymentCardFormSubmit)();
    };

    const onPaymentCardFormSubmit = () => {
        dispatch(setPaymentCardFormData(paymentCardFormMethods.getValues()));
        props.onContinueButtonClick();
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <PaymentMethodForm
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
