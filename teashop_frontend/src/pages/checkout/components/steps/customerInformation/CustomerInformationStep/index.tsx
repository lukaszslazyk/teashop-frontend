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

const CustomerInformationStep = (props: Props) => {
    const {
        contactInfoFormMethods,
        shippingAddressFormMethods,
        billingAddressFormMethods,
        handleContinueButtonClicked,
        handleBackButtonClicked,
    } = useLogic(props.onContinueButtonClick, props.onBackButtonClick);

    return (
        <Grid container spacing={3}>
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
                    onContinueButtonClick={handleContinueButtonClicked}
                    onBackButtonClick={handleBackButtonClicked}
                    backButtonLabel="Back to cart"
                />
            </Grid>
        </Grid>
    );
};

export default CustomerInformationStep;
