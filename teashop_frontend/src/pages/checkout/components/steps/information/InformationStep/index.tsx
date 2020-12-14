import { Grid } from "@material-ui/core";
import React from "react";
import { FormProvider } from "react-hook-form";
import NavButtonsPanel from "../../../NavButtonsPanel";
import BillingAddressForm from "../BillingAddressForm";
import ContactInfoForm from "../ContactInfoForm";
import ShippingAddressForm from "../ShippingAddressForm";
import useLogic from "./logic";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const InformationStep = (props: Props) => {
    const logic = useLogic(
        props.onContinueButtonClick,
        props.onBackButtonClick
    );
    const {
        contactInfoFormMethods,
        shippingAddressFormMethods,
        billingAddressFormMethods,
    } = logic;

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <FormProvider {...contactInfoFormMethods}>
                    <ContactInfoForm />
                </FormProvider>
            </Grid>
            <Grid item xs={12}>
                <FormProvider {...shippingAddressFormMethods}>
                    <ShippingAddressForm />
                </FormProvider>
            </Grid>
            <Grid item xs={12}>
                <FormProvider {...billingAddressFormMethods}>
                    <BillingAddressForm />
                </FormProvider>
            </Grid>
            <Grid item xs={12}>
                <NavButtonsPanel
                    onContinueButtonClick={logic.handleContinueButtonClicked}
                    onBackButtonClick={logic.handleBackButtonClicked}
                    backButtonLabel="Back to cart"
                />
            </Grid>
        </Grid>
    );
};

export default InformationStep;
