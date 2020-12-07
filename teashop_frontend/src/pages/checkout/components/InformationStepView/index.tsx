import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AddressFormData, ContactInfoFormData } from "../../../../domain/order/models";
import ContactInfoForm from "../ContactInfoForm";
import NavButtonsPanel from "../NavButtonsPanel";
import ShippingAddressFormContainer from "../ShippingAddressForm/container";

interface Props {
    contactInfoFormData: ContactInfoFormData,
    shippingAddressFormData: AddressFormData,
    setContactInfoFormData: (value: ContactInfoFormData) => void;
    setShippingAddressFormData: (value: AddressFormData) => void;
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
}

const InformationStepView = (props: Props) => {
    const [contactInfoFormValid, setContactInfoFormValid] = useState(false);
    const [shippingAddressFormValid, setShippingAddressFormValid] = useState(false);
    const { onContinueButtonClick } = props;

    const contactInfoFormMethods = useForm<ContactInfoFormData>({
        defaultValues: props.contactInfoFormData
    });
    const shippingAddressFormMethods = useForm<AddressFormData>({
        defaultValues: props.shippingAddressFormData
    });

    const handleContinueButtonClick = () => {
        setContactInfoFormValid(false);
        setShippingAddressFormValid(false);
        contactInfoFormMethods.handleSubmit(onContactInfoFormSubmit)();
        shippingAddressFormMethods.handleSubmit(onShippingAddressFormSubmit)();
    };

    const onContactInfoFormSubmit = () => {
        props.setContactInfoFormData(contactInfoFormMethods.getValues());
        setContactInfoFormValid(true);
    };

    const onShippingAddressFormSubmit = () => {
        props.setShippingAddressFormData(shippingAddressFormMethods.getValues());
        setShippingAddressFormValid(true);
    };

    useEffect(() => {
        if (contactInfoFormValid && shippingAddressFormValid)
            onContinueButtonClick();
    }, [contactInfoFormValid, shippingAddressFormValid, onContinueButtonClick]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <FormProvider {...contactInfoFormMethods}>
                    <ContactInfoForm />
                </FormProvider>
            </Grid>
            <Grid item xs={12}>
                <FormProvider {...shippingAddressFormMethods}>
                    <ShippingAddressFormContainer />
                </FormProvider>
            </Grid>
            <Grid item xs={12}>
                <NavButtonsPanel
                    onContinueButtonClick={handleContinueButtonClick}
                    onBackButtonClick={props.onBackButtonClick}
                    backButtonLabel="Back to cart"
                />
            </Grid>
        </Grid>
    );
};

export default InformationStepView;